'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.menu, {
        foreignKey: `id_menu`, as: `menu`
      })
      this.belongsTo(models.transaksi, {
        foreignKey: `id_transaksi`, as: `transaksi`
      })
    }
  }
  detail_transaksi.init({
    id_transaksi: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_transaksi',
  });
  return detail_transaksi;
};