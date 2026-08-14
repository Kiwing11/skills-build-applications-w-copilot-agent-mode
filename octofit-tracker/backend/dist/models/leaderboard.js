import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
}, { _id: false });
const leaderboardSchema = new Schema({
    scope: { type: String, enum: ['global', 'team'], default: 'global' },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'weekly' },
    entries: { type: [leaderboardEntrySchema], default: [] }
}, { timestamps: true });
const Leaderboard = model('Leaderboard', leaderboardSchema);
export default Leaderboard;
