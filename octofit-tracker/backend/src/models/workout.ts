import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
