const CompanyRepository = require('../repository/CompanyRepository');

class CompanyService {
    constructor() { }

    async show(company_id) {
      const company = await CompanyRepository.show(company_id);
      return company;
    }

    async delete(company_id) {
      const company = await CompanyRepository.destroy(company_id);
      return company;
    }

    async create(body) {
      let { handle, name, website, country, created_by } = body;
      const company_data = { handle, name, website, country, created_by };
      const company = await CompanyRepository.store(company_data);
      return company;
    }

    async paginated({ page, pageLimit, search, sortField, sortOrder, filterField, filterValue }) {
      const companies = await CompanyRepository.paginated({page, pageLimit, search, sortField, sortOrder, filterField, filterValue});
      return companies;
    }

    async update(company_id, body) {
      const result = await CompanyRepository.update(company_id, body);
      return result;
    }

}

module.exports = new CompanyService();