const Department = require('../models/Department');

function show (company_id, department_id) {
    return Department.show(company_id, department_id);
};

function destroy (company_id, department_id) {
    return Department.destroy(company_id, department_id);
};

function store (company_id, department_data) {
    return Department.store(company_id, department_data);
};

function update (company_id, department_id, body) {
    return Department.update(company_id, department_id, body);
};
module.exports = { show, destroy, store, update };