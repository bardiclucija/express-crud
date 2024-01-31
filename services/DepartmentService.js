const DepartmentRepository = require('../repository/DepartmentRepository');

class DepartmentService {

    constructor() { }

    async show(company_id, department_id) {
      const department = await DepartmentRepository.show(company_id, department_id);
      return department;
    }

    async delete(company_id, department_id) {
        const department = await DepartmentRepository.destroy(company_id, department_id);
        return department;
    }

    async create(company_id, body) {
      let { name, created_by, parent_id } = body;
      const department_data = { name, created_by, parent_id, company_id,};
      const department = await DepartmentRepository.store(department_data);
      return department;
    }

    async update(company_id, department_id, body) {
      const result = await DepartmentRepository.update(company_id, department_id, body);
      return result;
    }
}

module.exports = new DepartmentService();