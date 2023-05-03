'use strict';
import { Model } from 'sequelize';

interface TokenAttributes {
  id: string;
  token: string;
  expiresAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Token extends Model<TokenAttributes> implements TokenAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    token!: string;
    expiresAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now() + 60 * 60 * 1000,
      },
    },

    {
      timestamps: true,
      updatedAt: false,
      sequelize,
      modelName: 'Token',
    }
  );
  return Token;
};
