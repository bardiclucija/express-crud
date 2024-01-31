const Company = require('../models/Company');

function show (company_id) {
    return Company.show(company_id);
};

function destroy (company_id) {
    return Company.destroy(company_id);
};

function store (company_data) {
    return Company.store(company_data);
};

function paginated (query) {
    return Company.paginated(query);
};

function update (company_id, body) {
    return Company.update(company_id, body);
};
module.exports = { show, destroy, store, paginated, update };