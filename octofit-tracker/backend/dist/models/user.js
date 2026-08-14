import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    goals: [{ type: String, trim: true }],
    weeklyMinutes: { type: Number, default: 0 }
}, { timestamps: true });
const User = model('User', userSchema);
export default User;
