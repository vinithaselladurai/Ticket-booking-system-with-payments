const { body, query, param } = require('express-validator');

const registerValidation = [
  body('name').optional().isString(),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
  body('age').optional().isInt({ min: 0 }),
  body('heightCm').optional().isFloat({ min: 0 }),
  body('weightKg').optional().isFloat({ min: 0 })
];

const loginValidation = [
  body('email').isEmail(),
  body('password').exists()
];

const mealCreateValidation = [
  body('name').optional().isString(),
  body('date').optional().isISO8601(),
  body('calories').optional().isFloat({ min: 0 }),
  body('protein').optional().isFloat({ min: 0 }),
  body('carbs').optional().isFloat({ min: 0 }),
  body('fat').optional().isFloat({ min: 0 })
];

const workoutCreateValidation = [
  body('type').optional().isString(),
  body('date').optional().isISO8601(),
  body('durationMin').optional().isFloat({ min: 0 }),
  body('caloriesBurned').optional().isFloat({ min: 0 })
];

const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 500 }).toInt(),
  query('from').optional().isISO8601(),
  query('to').optional().isISO8601()
];

module.exports = {
  registerValidation,
  loginValidation,
  mealCreateValidation,
  workoutCreateValidation,
  paginationValidation
};
