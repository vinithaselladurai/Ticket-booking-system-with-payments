const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: Date, default: Date.now, index: true },
  type: { type: String, default: 'General' },
  durationMin: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
