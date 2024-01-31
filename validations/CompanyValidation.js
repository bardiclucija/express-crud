const { body, param, validationResult } = require('express-validator');

class UserValidation {
  validate(method) {
    const validationRules = [];
    switch (method) {
      case 'paginated': {
        break;
      }
      case 'show': {
        validationRules.push(param("company_id").isUUID().notEmpty().withMessage("Invalid company ID"));
        break;
      }
      case 'create': {
        validationRules.push(
            body('handle').notEmpty().withMessage('Handle is required'),
            body('name').notEmpty().withMessage('Name is required'),
            body('website').notEmpty().isURL().notEmpty().withMessage('Website is required'),
            body('country').notEmpty().withMessage('Country is required'),
            body('created_by').notEmpty().isUUID().withMessage('Created_by must be set')
        );
        break;
      }
      case 'update': {
        validationRules.push(
            param('company_id').isUUID().withMessage('Invalid company ID'),
            body("handle").optional().notEmpty().withMessage("Handle cannot be empty"),
            body('name').optional().notEmpty().withMessage('Name is required'),
            body("website").optional().isURL().notEmpty().withMessage("Website is required"),
            body("country").optional().notEmpty().withMessage("Country is required")
        );
        break;
      }
      case 'delete': {
        validationRules.push(param("company_id").isUUID().notEmpty().withMessage("Invalid company ID"));
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
