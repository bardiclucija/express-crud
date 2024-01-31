const UserRepository = require('../repository/UserRepository');

class UserService {
    constructor() { }

    async show(user_id) {
      const user = await UserRepository.show(user_id);
      return user;
    }

    async paginated({ page, pageLimit, search, sortField, sortOrder, filterField, filterValue }) {
      const users = await UserRepository.paginated({page, pageLimit, search, sortField, sortOrder, filterField, filterValue});
      return users;
    }

    async create(body) {
      let { email, first_name, last_name, password } = body;
      const userData = { email, first_name, last_name, password,};
      const user = await UserRepository.store(userData);
      return user;
    }

    async delete(user_id) {
      const result = await UserRepository.destroy(user_id);
      return result;
    }

    async update(user_id, body) {
      const result = await UserRepository.update(user_id, body);
      return result;
    }
}

module.exports = new UserService();