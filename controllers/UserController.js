const UserService = require('../services/UserService');

class UserController {

  async show(req, res) {
    try {
      const user = await UserService.show(req.params.user_id);
      if (!user) {
        return res.status(404).json({ errors: "User not found." });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  async paginated(req, res) {
    try {
      const { page=1, pageLimit=10, search, sortField, sortOrder, filterField, filterValue } = req.query;
      const users = await UserService.paginated({ page, pageLimit, search, sortField, sortOrder, filterField, filterValue});
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  async delete(req, res) {
    try {
      const result = await UserService.delete(req.params.user_id);
      if (!result) {
        return res.status(404).json({ errors: "User not found." });
      }
      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  async update(req, res) {
    try {
      let result = await UserService.show(req.params.user_id);
      if (!result) {
        return res.status(404).json({ errors: "User not found." });
      }
      result = await UserService.update(req.params.user_id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

module.exports = new UserController();