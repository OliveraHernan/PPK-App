import mongoose, { Schema, Document } from 'mongoose';

// Interface para el documento User
interface User extends Document {
  nombreYapellido: string;
  registrationDate: Date;
  email: string;
  contraseña: string;
  token?: string; // Opcional, para manejo de autenticación temporal
  position: string[];
  isActive: boolean; // Para deshabilitar usuarios si es necesario
}

// Esquema de Mongoose
const UserSchema = new Schema<User>({
  nombreYapellido: {
    type: String,
    required: true,
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  contraseña: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  position: {
    type: [String],
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // Crea automáticamente createdAt y updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Índices para mejorar rendimiento de búsqueda
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ isActive: 1 });

// Evitar el error de modelo ya definido en Next.js con hot reloading
const User = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default User;
