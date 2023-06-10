'use strict';
import { Model } from 'sequelize';
import slugify from 'slugify';
import capFirstLetter from '../utils/capFirstLetter';

interface FileAttributes {
  id: string;
  title: string;
  description: string;
  slug: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class File extends Model<FileAttributes> implements FileAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    title!: string;
    description!: string;
    slug!: string;

    static associate(models: any) {
      // define association here
      // Download
      File.hasMany(models.Download);
      models.Download.belongsTo(File);
      // Emails
      File.hasMany(models.Email);
      models.Email.belongsTo(File);
    }
  }
  File.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter a title',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter a description',
          },
        },
      },
      slug: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'File',
    }
  );

  File.beforeSave(async (File: any) => {
    const actualString = File.title.split('.');
    actualString.pop();
    File.slug = capFirstLetter(actualString.join('.'));
  });
  return File;
};
