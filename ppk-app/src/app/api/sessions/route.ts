import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectDB from '@/src/lib/db/mongodb';
import Session from '@/src/lib/db/models/Session';
import { verifyToken } from '@/src/lib/auth/token';

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
  status: 'active' | 'inactive';
  facilitator: string;
  participants: string[];
  estimationType: 'fibonacci' | 'tshirt';
  visibility: boolean;
  accessCode?: string;
  createdBy?: string;
  isActive?: boolean;
  userStories: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'voting' | 'completed';
    votes: {
      userId: string;
      value: number | string;
      timestamp?: Date;
    }[];
  }[];
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

  converted.visibility = data.visibility === true;

  return converted;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data: SessionData = await req.json();

    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    const convertedData = convertToMongooseFormat(data);
    convertedData.createdBy = new ObjectId(user.id).toString();
    convertedData.isActive = true;

    const session = new Session(convertedData);
    await session.save();

    return NextResponse.json(session);
  } catch (error: any) {
    console.error("Error en POST /api/sessions:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    const query = { createdBy: new ObjectId(user.id) };

    const sessions = await Session.find(query).sort({ startDate: -1 });

    return NextResponse.json(sessions);
  } catch (error: any) {
    console.error("Error en GET /api/sessions:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Add a new PATCH endpoint to toggle session active status
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    
    const { sessionId, isActive } = await req.json();
    const userId = req.headers.get('user-id'); // You'll need to implement proper auth

    if (!userId || !isValidObjectId(userId)) {
      return NextResponse.json({ error: 'Invalid or missing user ID' }, { status: 401 });
    }

    if (!sessionId || !isValidObjectId(sessionId)) {
      return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }

    const session = await Session.findOne({
      _id: new ObjectId(sessionId),
      createdBy: new ObjectId(userId)
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    session.isActive = isActive;
    await session.save();

    return NextResponse.json(session);
  } catch (error: any) {
    console.error("Error in PATCH /api/sessions:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}