const { body, param, validationResult } = require('express-validator');
class UserValidation {
  validate(method) {
    const validationRules = [];
    switch (method) {
      case 'paginated': {
        break;
      }
      case 'show': {
        validationRules.push(param('user_id').isUUID().withMessage('Invalid user ID'));
        break;
      }
      case 'create': {
        validationRules.push(
          body('email').isEmail().withMessage('Invalid email address'),
          body('first_name').notEmpty().withMessage('First name is required'),
          body('last_name').notEmpty().withMessage('Last name is required'),
          body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        );
        break;
      }
      case 'update': {
        validationRules.push(
          param('user_id').isUUID().withMessage('Invalid user ID'),
          body('first_name').optional().notEmpty().withMessage('First name is required'),
          body('last_name').optional().notEmpty().withMessage('Last name is required'),
          body('email').optional().isEmail().withMessage('Invalid email address')
        );
        break;
      }
      case 'destroy': {
        validationRules.push(
          param('user_id').isUUID().withMessage('Invalid user ID')
        );
        break;
      }
    }
    validationRules.push(this.validateResults);
    return validationRules;
  }
  validateResults(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  }
}
module.exports = new UserValidation();