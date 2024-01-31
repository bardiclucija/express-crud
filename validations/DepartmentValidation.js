const { body, param, validationResult } = require('express-validator');

class UserValidation {
  validate(method) {
    const validationRules = [];
    switch (method) {
      case 'paginated': {
        break;
      }
      case 'show': {
        validationRules.push(
          param("department_id").isUUID().withMessage("Invalid company department ID"),
          param("department_id").isUUID().withMessage("Invalid company department ID")
          );
        break;
      }
      case 'create': {
        validationRules.push(
            param("company_id").isUUID().withMessage("Invalid company ID"),
            body('name').notEmpty().withMessage('Name is required'),
            body('created_by').notEmpty().isUUID.apply('Invalid company ID')
        );
        break;
      }
      case 'update': {
        validationRules.push(
            param("company_id").isUUID().withMessage("Invalid company ID"),
            param("department_id").isUUID().withMessage("Invalid company department ID"),
            body("name").optional().notEmpty().withMessage("Name is required")
        );
        break;
      }
      case 'delete': {
        validationRules.push(
            param("company_id").isUUID().withMessage("Invalid company ID"),
            param("department_id").isUUID().withMessage("Invalid company department ID")
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