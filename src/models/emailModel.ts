'use strict';
import { Model } from 'sequelize';

interface EmailAttributes {
  id: string;
  emailSentTo: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Email extends Model<EmailAttributes> implements EmailAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    emailSentTo!: string;

    static associate(models: any) {
      // define association here
      // Email.hasMany(models.File);
      // models.File.belongsTo(Email);
    }
  }
  Email.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      emailSentTo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a recipient',
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'emailDate',
      updatedAt: false,
      sequelize,
      modelName: 'Email',
    }
  );
  return Email;
};
