const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const UserController = require('./controllers/UserController');
const UserValidation = require('./validations/UserValidation');
const CompanyController = require('./controllers/CompanyController');
const CompanyValidation = require('./validations/CompanyValidation');
const DepartmentController = require('./controllers/DepartmentController');
const DepartmentValidation = require('./validations/DepartmentValidation');

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get('/api/users/:user_id', UserValidation.validate('show'), UserController.show);
app.get('/api/users', UserValidation.validate('paginated'), UserController.paginated);
app.post('/api/users', UserValidation.validate('create'), UserController.create);
app.delete('/api/users/:user_id', UserValidation.validate('delete'), UserController.delete);
app.put('/api/users/:user_id', UserValidation.validate('update'), UserController.update);

app.get('/api/companies/:company_id', CompanyValidation.validate('show'), CompanyController.show);
app.delete('/api/companies/:company_id', CompanyValidation.validate('delete'), CompanyController.delete);
app.post('/api/companies', CompanyValidation.validate('create'), CompanyController.create);
app.get('/api/companies', CompanyValidation.validate('paginated'), CompanyController.paginated);
app.put('/api/companies/:company_id', CompanyValidation.validate('update'), CompanyController.update);

app.get('/api/companies/:company_id/departments/:department_id', DepartmentValidation.validate('show'), DepartmentController.show);
app.delete('/api/companies/:company_id/departments/:department_id', DepartmentValidation.validate('delete'), DepartmentController.delete);
app.post('/api/companies/:company_id/departments', DepartmentValidation.validate('create'), DepartmentController.create);
app.put('/api/companies/:company_id/departments/:department_id', DepartmentValidation.validate('update'), DepartmentController.update);

const server = app.listen(port);

module.exports = server;