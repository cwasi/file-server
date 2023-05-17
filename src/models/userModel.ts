'use strict';
import { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: string;
  name: string;
  photo: string;
  role: string;
  email: string;
  password: string;
  verifyCode: string;
  isVerified: boolean;
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
    verifyCode!: string;
    isVerified!: boolean;
    passwordChangedAt!: Date;
    passwordResetToken!: String;
    passwordResetExpires!: Date;

    static associate(models: any) {
      // define association here
      User.hasOne(models.Token)
      models.Token.belongsTo(User)
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
            msg: 'Please Provide a valid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a password',
          },
        },
      },
      passwordConfirm: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          validatePasswords(value: string) {
            if (!(value === this.password)) {
              throw new Error('Password are not the same');
            }
          },
        },
      },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      verifyCode: DataTypes.STRING,
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
    },

    {
      timestamps: true,
      updatedAt: false,
      sequelize,
      modelName: 'User',
    }
  );

  // Hooks
  User.beforeSave(async (user: any) => {
    if (!user.changed('password')) {
      return;
    }
    // STEP: Hash the password with cost of 12
    user.password = await bcrypt.hash(user.password, 12);
  });

  User.beforeSave(async (user: any) => {
    if (!user.changed('password' || user.isNewRecord)) {
      return;
    }
    user.passwordChangedAt = Date.now() - 1000;
  });

  return User;
};
