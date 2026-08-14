import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      required: true,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'hike']
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    performedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const Activity = model('Activity', activitySchema);

export default Activity;
