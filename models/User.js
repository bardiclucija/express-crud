const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

class User extends Model {
    static async show(user_id) {
        const user = await User.findByPk(user_id);
        return user;
    }

    static async destroy(user_id) {
        const user = await User.findByPk(user_id);
        await user.destroy();
        return user;
    }

    static async store(user_data) {
        const { email, first_name, last_name, password } = user_data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email:email, first_name, last_name, password:hashedPassword});
        return user;
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
              { email: { [Op.iLike]: `%${search}%` } },
              { first_name: { [Op.iLike]: `%${search}%` } },
              { last_name: { [Op.iLike]: `%${search}%` } },
          ],
        }
      }
      if (filterField && filterValue) {
        query_search.where[filterField] = { [Op.iLike]: `%${filterValue}%` };
      }

      const users = await User.findAll(query_search);
      return users;
    }

    static async update(user_id, body) {
        const user = await User.findByPk(user_id);
        const {first_name, last_name} = body;
        user.first_name = first_name ?? user.first_name;
        user.last_name = last_name ?? user.last_name;
        await user.save();
        return user;
    }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_secret: {
      type: DataTypes.STRING,
    },
    google_id: {
      type: DataTypes.STRING,
    },
    github_id: {
      type: DataTypes.STRING,
    },
    linkedin_id: {
      type: DataTypes.STRING,
    },
    locale: {
      type: DataTypes.STRING(5),
    },
    timezone: {
      type: DataTypes.STRING(64),
    },
    city_country: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
    },
    phone: {
      type: DataTypes.TEXT,
    },
    dob: {
      type: DataTypes.DATE,
    },
    workplace: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: [],
    },
    gender: {
      type: DataTypes.STRING,
    },
    disability: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    notifications_read_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    talent_onboarding_done: {
      type: DataTypes.DATE,
    },
    company_onboarding_done: {
      type: DataTypes.DATE,
    },
    culture_clan: {
      type: DataTypes.FLOAT,
    },
    culture_adhocracy: {
      type: DataTypes.FLOAT,
    },
    culture_hierarchy: {
      type: DataTypes.FLOAT,
    },
    culture_market: {
      type: DataTypes.FLOAT,
    },
    title: {
      type: DataTypes.STRING,
    },
    profile_picture: {
      type: DataTypes.JSONB,
    },
    cover_picture: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      field: 'updated_at',
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    deactivate_message: {
      type: DataTypes.TEXT,
    },
    privacy_mode: {
      type: DataTypes.STRING,
      defaultValue: 'public',
    },
    tsq: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    freeze_message: {
      type: DataTypes.TEXT,
    },
    admin_actions: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

module.exports = User;
