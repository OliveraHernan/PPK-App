import mongoose, { Schema, Document } from 'mongoose';

// Interfaces
interface Vote extends Document {
  userId: Schema.Types.ObjectId;
  value: number | string;
  timestamp: Date;
}

interface UserStory extends Document {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'voting' | 'completed';
  votes: Vote[];
  finalEstimation?: number | string;
}

interface Session extends Document {
  name: string;
  startDate: Date;
  endDate?: Date;
  duration: number;
  status: 'scheduled' | 'active' | 'completed';
  facilitator: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  estimationType: 'fibonacci' | 'tshirt' | 'custom';
  customEstimationValues?: (number | string)[];
  visibility: 'private' | 'public';
  accessCode?: string;
  userStories: UserStory[];
}

// Esquemas
const VoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UserStorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'voting', 'completed'],
    default: 'pending'
  },
  votes: [VoteSchema],
  finalEstimation: {
    type: Schema.Types.Mixed,
    default: null
  }
}, {
  timestamps: true
});

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['scheduled', 'active', 'completed'],
    default: 'scheduled'
  },
  facilitator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  estimationType: {
    type: String,
    enum: ['fibonacci', 'tshirt', 'custom'],
    default: 'fibonacci'
  },
  customEstimationValues: [{
    type: Schema.Types.Mixed
  }],
  visibility: {
    type: String,
    enum: ['private', 'public'],
    default: 'private'
  },
  accessCode: {
    type: String,
    sparse: true
  },
  userStories: [UserStorySchema]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices
SessionSchema.index({ name: 1 });
SessionSchema.index({ status: 1 });
SessionSchema.index({ facilitator: 1 });
SessionSchema.index({ 'userStories.title': 1 });
SessionSchema.index({ accessCode: 1 }, { sparse: true });

// Evitar el error de modelo ya definido en Next.js con hot reloading
const Session = mongoose.models.Session || mongoose.model<Session>('Session', SessionSchema);

export default Session;