'use strict';
import { Model } from 'sequelize';

interface DownloadAttributes {
  id: string;
  downloadedBy: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Download
    extends Model<DownloadAttributes>
    implements DownloadAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    name!: string;
    downloadedBy!: string;

    static associate(models: any) {
      // define association here
    }
  }
  Download.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      downloadedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      timestamps: false,
      sequelize,
      modelName: 'Download',
    }
  );
  return Download;
};
