const User = require('../models/User');

function show (user_id) {
    return User.show(user_id);
};

function destroy (user_id) {
    return User.destroy(user_id);
};

function store (user_data) {
    return User.store(user_data);
};

function paginated (query) {
    return User.paginated(query);
};

function update(user_id, body) {
    return User.update(user_id, body);
};
module.exports = { show, destroy, store, paginated, update };