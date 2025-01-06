import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectDB from '@/src/lib/db/mongodb';
import Session from '@/src/lib/db/models/Session';

interface Vote {
  userId: string;
  value: number | string;
  timestamp?: Date;
}

interface UserStory {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'voting' | 'completed';
  votes: Vote[];
  finalEstimation?: number | string;
}

interface SessionData {
  name: string;
  startDate: string;
  endDate?: string;
  duration: number;
  status: 'scheduled' | 'active' | 'completed';
  facilitator: string;
  participants: string[];
  estimationType: 'fibonacci' | 'tshirt' | 'custom';
  customEstimationValues?: (number | string)[];
  visibility: 'private' | 'public';
  accessCode?: string;
  userStories: UserStory[];
}

// Validation functions
function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

function validateSessionData(data: SessionData): void {
  if (!data.name?.trim()) {
    throw new Error('Session name is required');
  }

  if (!data.startDate || isNaN(Date.parse(data.startDate))) {
    throw new Error('Valid start date is required');
  }

  if (data.endDate && isNaN(Date.parse(data.endDate))) {
    throw new Error('Invalid end date format');
  }

  if (!data.duration || data.duration < 1) {
    throw new Error('Duration must be at least 1 minute');
  }

  if (!data.facilitator || !isValidObjectId(data.facilitator)) {
    throw new Error('Valid facilitator ID is required');
  }

  if (!Array.isArray(data.participants)) {
    throw new Error('Participants must be an array');
  }

  data.participants.forEach(id => {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid participant ID: ${id}`);
    }
  });

  if (!['fibonacci', 'tshirt', 'custom'].includes(data.estimationType)) {
    throw new Error('Invalid estimation type');
  }

  if (data.estimationType === 'custom' && (!Array.isArray(data.customEstimationValues) || data.customEstimationValues.length === 0)) {
    throw new Error('Custom estimation type requires valid estimation values');
  }

  if (Array.isArray(data.userStories)) {
    data.userStories.forEach((story, index) => {
      if (!story.title?.trim()) {
        throw new Error(`User story at index ${index} requires a title`);
      }
      if (!story.description?.trim()) {
        throw new Error(`User story at index ${index} requires a description`);
      }
      if (story.priority && !['high', 'medium', 'low'].includes(story.priority)) {
        throw new Error(`Invalid priority for user story: ${story.title}`);
      }
      if (story.status && !['pending', 'voting', 'completed'].includes(story.status)) {
        throw new Error(`Invalid status for user story: ${story.title}`);
      }
    });
  }
}

function convertToMongooseFormat(data: SessionData) {
  const converted = { ...data };
  converted.startDate = new Date(data.startDate).toISOString();
  if (data.endDate) {
    converted.endDate = new Date(data.endDate).toISOString();
  }

  converted.facilitator = new ObjectId(data.facilitator).toString();
  converted.participants = data.participants.map(id => new ObjectId(id).toString());

  if (converted.userStories) {
    converted.userStories = data.userStories.map(story => {
      const updatedVotes = story.votes?.map(vote => ({
        ...vote,
        userId: new ObjectId(vote.userId).toString(),
        timestamp: vote.timestamp || new Date()
      })) || [];

      return {
        ...story,
        votes: updatedVotes
      };
    });
  }

  return converted;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data: SessionData = await req.json();
    console.log('Received session data:', data);

    validateSessionData(data);

    const convertedData = convertToMongooseFormat(data);

    const session = new Session(convertedData);
    await session.save();

    return NextResponse.json(session);
  } catch (error: any) {
    console.error("Error in POST /api/sessions:", error.message);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('required') || error.message.includes('Invalid') ? 400 : 500 }
    );
  }
}

// Mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const query: any = {};

    const facilitator = searchParams.get('facilitator');
    const status = searchParams.get('status');
    const visibility = searchParams.get('visibility');
    const accessCode = searchParams.get('accessCode');

    if (facilitator && isValidObjectId(facilitator)) {
      query.facilitator = new ObjectId(facilitator);
    }

    if (status && ['scheduled', 'active', 'completed'].includes(status)) {
      query.status = status;
    }

    if (visibility && ['private', 'public'].includes(visibility)) {
      query.visibility = visibility;
    }

    if (accessCode) {
      query.accessCode = accessCode;
    }

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const total = await Session.countDocuments(query);

    const sessions = await Session.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ startDate: -1 });

    return NextResponse.json({
      sessions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error("Error in GET /api/sessions:", error.message);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}