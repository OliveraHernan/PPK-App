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
  status: 'active' | 'inactive';
  facilitator: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  estimationType: 'fibonacci' | 'tshirt';
  visibility: boolean;
  accessCode?: string;
  userStories: UserStory[];
  createdBy: Schema.Types.ObjectId;
  isActive: boolean;
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
    enum: ['active', 'inactive'],
    default: 'active'
  },
  visibility: {
    type: Boolean,
    default: true
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
    enum: ['fibonacci', 'tshirt'],
    default: 'fibonacci'
  },
  customEstimationValues: [{
    type: Schema.Types.Mixed
  }],
  accessCode: {
    type: String,
    sparse: true
  },
  userStories: [UserStorySchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add new indices
SessionSchema.index({ createdBy: 1 });
SessionSchema.index({ isActive: 1 });
SessionSchema.index({ name: 1 });
SessionSchema.index({ status: 1 });
SessionSchema.index({ facilitator: 1 });
SessionSchema.index({ 'userStories.title': 1 });
SessionSchema.index({ accessCode: 1 }, { sparse: true });

// Evitar el error de modelo ya definido en Next.js con hot reloading
const Session = mongoose.models.Session || mongoose.model<Session>('Session', SessionSchema);

export default Session;