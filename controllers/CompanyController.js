const CompanyService = require('../services/CompanyService');
const UserService = require('../services/UserService');

class CompanyController {
    async show(req, res) {
        try {
          const company = await CompanyService.show(req.params.company_id);
          if (!company) {
            return res.status(404).json({ errors: "Company not found." });
          }
          return res.status(200).json(company);
        } catch (error) {
          return res.status(500).json({ error: 'Something went wrong.' });
        }
    }
    async delete(req, res) {
      try {
        const user = await UserService.show(req.body.created_by);
        if (!user) {
            return res.status(404).json({ errors: "User not found." });
        }
        const result = await CompanyService.delete(req.params.company_id);
        if (!result) {
          return res.status(404).json({ errors: "Company not found." });
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
        const result = await CompanyService.create(req.body);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
      }
    }

    async paginated(req, res) {
      try {
        const { page=1, pageLimit=10, search, sortField, sortOrder, filterField, filterValue } = req.query;
        const companies = await CompanyService.paginated({ page, pageLimit, search, sortField, sortOrder, filterField, filterValue});
        return res.status(200).json(companies);
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
      }
    }

    async update(req, res) {
      try {
        let result = await CompanyService.show(req.params.company_id);
        if (!result) {
          return res.status(404).json({ errors: "Company not found." });
        }
        result = await CompanyService.update(req.params.company_id, req.body);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
      }
    }
}

module.exports = new CompanyController();