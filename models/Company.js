const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const UserService = require('../services/UserService');

class Company extends Model {
    static async show(company_id) {
        const company = await Company.findByPk(company_id);
        return company;
    }

    static async destroy(company_id) {
        const company = await Company.findByPk(company_id);
        await company.destroy();
        return company;
    }

    static async store(company_data) {
        const { handle, name, website, country, created_by } = company_data;
        const company = await Company.create({
            handle,
            name,
            website,
            country,
            created_by,
            representative_first_name: user.first_name,
            representative_last_name: user.last_name,
            representative_email: user.email,
        });
        return company;
    }

    static async paginated(query) {
        const { page = 1, pageLimit = 10, search, sortField, sortOrder, filterField, filterValue } = query;
        const query_search = {
          where : {},
          order: sortField ? [[sortField, sortOrder === 'desc' ? 'DESC' : 'ASC']] : [],
          limit: pageLimit,
          offset: (page - 1) * pageLimit
        } 
        if (search) {
          query_search.where = {
            [Op.or]: [
                { handle: { [Op.iLike]: `%${search}%` } },
                { name: { [Op.iLike]: `%${search}%` } },
                { website: { [Op.iLike]: `%${search}%` } },
                { representative_first_name: { [Op.iLike]: `%${search}%` } },
                { representative_last_name  : { [Op.iLike]: `%${search}%` } },
            ],

          }
        }
        if (filterField && filterValue) {
          query_search.where[filterField] = { [Op.iLike]: `%${filterValue}%` };
        }
        const companies = await Company.findAll(query_search);
        return companies;
    }

    static async update(company_id, body) {
        const company = await Company.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ errors: "Company not found." });
        }
        const {handle, name, website, country} = body;
        company.handle = handle ?? company.handle;
        company.name = name ?? company.name;
        company.website = website ?? company.website;
        company.country = country ?? company.country;
        await company.save();
        return company;
    }

}

Company.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        handle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eu_vat_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        business_entity_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        organization_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        long_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        long_description_text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        culture_clan: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        culture_adhocracy: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        culture_hierarchy: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        culture_market: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        established_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        representative_first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        representative_last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        representative_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        representative_phone: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        mission: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        vision: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        values: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        career_growth_path: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        person_in_charge: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        topics: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            defaultValue: [],
        },
        hr_one_on_one: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        leaders_one_on_one: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        hr_session_frequency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hr_session_conductor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        leader_session_frequency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        leader_session_conductor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employee_development: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        team_building_activities: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        team_building_frequency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employee_training_programs: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        employee_learning_programs: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        learning_initiatives: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        learning_activity: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        continuous_learning: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        offering: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        expectation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        benefits_and_perks: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        flexible_work: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        remote_work: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        pet_friendly_office: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        work_life_balance: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        profile_picture: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        cover_picture: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        icon_picture: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
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
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deactivate_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        meta_title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        meta_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        meta_image: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "company",
        tableName: "companies",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }

);

module.exports = Company;
