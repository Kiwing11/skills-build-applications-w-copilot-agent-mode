import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        name: 'Alicja Nowak',
        email: 'alicja.nowak@octofit.dev',
        fitnessLevel: 'intermediate',
        goals: ['10k under 55 minutes', '3 strength sessions per week'],
        weeklyMinutes: 210
      },
      {
        name: 'Marek Zielinski',
        email: 'marek.zielinski@octofit.dev',
        fitnessLevel: 'advanced',
        goals: ['Half marathon prep', 'Improve VO2 max'],
        weeklyMinutes: 320
      },
      {
        name: 'Julia Wisniewska',
        email: 'julia.wisniewska@octofit.dev',
        fitnessLevel: 'beginner',
        goals: ['Consistency for 8 weeks', 'Build core strength'],
        weeklyMinutes: 140
      },
      {
        name: 'Kamil Dabrowski',
        email: 'kamil.dabrowski@octofit.dev',
        fitnessLevel: 'intermediate',
        goals: ['Ride 150 km monthly', 'Mobility routine'],
        weeklyMinutes: 180
      }
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crushers',
        city: 'Warsaw',
        captain: users[1]._id,
        members: [users[0]._id, users[1]._id],
        totalPoints: 980
      },
      {
        name: 'Strength Syndicate',
        city: 'Krakow',
        captain: users[2]._id,
        members: [users[2]._id, users[3]._id],
        totalPoints: 840
      }
    ]);

    await Promise.all([
      User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id }),
      User.findByIdAndUpdate(users[1]._id, { team: teams[0]._id }),
      User.findByIdAndUpdate(users[2]._id, { team: teams[1]._id }),
      User.findByIdAndUpdate(users[3]._id, { team: teams[1]._id })
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 490,
        distanceKm: 9.4,
        performedAt: new Date('2026-08-10T06:45:00Z')
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'cycle',
        durationMinutes: 75,
        caloriesBurned: 670,
        distanceKm: 28.2,
        performedAt: new Date('2026-08-11T17:20:00Z')
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 48,
        caloriesBurned: 410,
        performedAt: new Date('2026-08-12T18:10:00Z')
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        performedAt: new Date('2026-08-13T07:15:00Z')
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'swim',
        durationMinutes: 40,
        caloriesBurned: 360,
        distanceKm: 1.5,
        performedAt: new Date('2026-08-13T19:00:00Z')
      }
    ]);

    await Leaderboard.create({
      scope: 'global',
      period: 'weekly',
      entries: [
        { user: users[1]._id, team: teams[0]._id, points: 520, rank: 1 },
        { user: users[0]._id, team: teams[0]._id, points: 460, rank: 2 },
        { user: users[2]._id, team: teams[1]._id, points: 420, rank: 3 },
        { user: users[3]._id, team: teams[1]._id, points: 390, rank: 4 }
      ]
    });

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        difficulty: 'intermediate',
        focus: 'endurance',
        durationMinutes: 45,
        equipment: ['running shoes', 'sport watch'],
        description: 'Warm-up, 3x8 min tempo intervals, then cooldown jog.',
        tags: ['running', 'cardio', 'intervals']
      },
      {
        title: 'Foundational Strength Circuit',
        difficulty: 'beginner',
        focus: 'full body',
        durationMinutes: 30,
        equipment: ['dumbbells', 'mat'],
        description: 'Three rounds of squats, rows, presses, and plank holds.',
        tags: ['strength', 'full-body', 'home-workout']
      },
      {
        title: 'Advanced HIIT Ladder',
        difficulty: 'advanced',
        focus: 'power',
        durationMinutes: 38,
        equipment: ['kettlebell', 'timer'],
        description: 'Ladder intervals with swings, burpees, and jump lunges.',
        tags: ['hiit', 'conditioning', 'power']
      },
      {
        title: 'Mobility and Core Restore',
        difficulty: 'beginner',
        focus: 'mobility',
        durationMinutes: 25,
        equipment: ['mat', 'resistance band'],
        description: 'Dynamic mobility flow followed by controlled core drills.',
        tags: ['mobility', 'core', 'recovery']
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
