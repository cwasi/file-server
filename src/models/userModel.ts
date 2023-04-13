'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  photo: string;
  role: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    name!: string;
    photo!: string;
    role!: string;
    email!: string;
    password!: string;
    passwordConfirm!: string;
    passwordChangedAt!: Date;
    passwordResetToken!: String;
    passwordResetExpires!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      photo: {
        type: DataTypes.STRING,
        defaultValue: 'default.jpg',
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please tell us your name',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Provide a valid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a passwor',
          },
        },
      },
      passwordConfirm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validatePasswords(value: string) {
            if (!(value === this.password)) {
              throw new Error('Password are not the same');
            }
          },
        },
      },
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
