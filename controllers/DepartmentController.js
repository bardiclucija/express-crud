const DepartmentService = require('../services/DepartmentService');
const CompanyService = require('../services/CompanyService');
const UserService = require('../services/UserService');
class DepartmentController {

    async show(req, res) {
        try {
          const department = await DepartmentService.show(req.params.company_id, req.params.department_id);
          if (!department) {
            return res.status(404).json({ errors: "Department not found." });
          }
          return res.status(200).json(department);
        } catch (error) {
          return res.status(500).json({ error: 'Something went wrong.' });
        }
    }

    async delete(req, res) {
        try {
          const result = await DepartmentService.delete(req.params.company_id, req.params.department_id);
          if (!result) {
            return res.status(404).json({ errors: "Department not found." });
          }
          return res.status(200).send();
        } catch (error) {
          return res.status(500).json({ error: 'Something went wrong.' });
        }
    }

    async create(req, res) {
        try {
          const user = await UserService.show(req.body.created_by);
          if (!user) {
            return res.status(404).json({ errors: "User not found." });
          }
          const company = await CompanyService.show(req.params.company_id);
          if (!company) {
            return res.status(404).json({ errors: "Company not found" });
          }
          const result = await DepartmentService.create(req.params.company_id, req.body);
          return res.status(200).json(result);
        } catch (error) {
          return res.status(500).json({ error: 'Something went wrong.' });
        }
    }

    async update(req, res) {
      try {
        const company = await CompanyService.show(req.params.company_id);
        if (!company){
            return res.status(404).json({ errors: "Company not found" });
        }
        let result = await DepartmentService.show(req.params.company_id, req.params.department_id);
        if (!result) {
          return res.status(404).json({ errors: "Department not found." });
        }
        result = await DepartmentService.update(req.params.company_id, req.params.department_id, req.body);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
      }
    }
}

module.exports = new DepartmentController();