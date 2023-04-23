'use strict';
import { Model } from 'sequelize';

interface FileAttributes {
  id: string;
  file: string;
  title: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class File extends Model<FileAttributes> implements FileAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    file!: string;
    title!: string;
    description!: string;

    static associate(models: any) {
      // define association here
      File.hasMany(models.Download);
      models.Download.belongsTo(File)
    }
  }
  File.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide the file',
          },
        },
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
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'File',
    }
  );
  return File;
};
