const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const { Op } = require("sequelize");

class Department extends Model {
    static associate(models) {
        CompanyDepartment.belongsTo(models.Company, {
          foreignKey: "company_id",
          onDelete: "CASCADE",
        });
    }

    static async show(company_id, department_id) {
        const id = department_id;
        const department = await Department.findOne({where: { id, company_id },});
        return department;
    }

    static async destroy(company_id, department_id) {
        const id = department_id;
        const department = await Department.findOne({where: { id, company_id },});
        await department.destroy();
        return department;
    }

    static async store(department_data) {
        const { name, company_id, parent_id, created_by } = department_data;
        const department = await Department.create({ name, company_id, parent_id, created_by});
        return department;
    }

    static async update(company_id, department_id, body) {
        const id = department_id;
        const department = await Department.findOne({where: { id, company_id },});
        const { name } = body;
        department.name = name ?? department.name;
        await department.save();
        return department;
    }

}

Department.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
        archived_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
   },
    {
        sequelize,
        modelName: "company_department",
        tableName: "company_departments",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",

    }

);

module.exports = Department;