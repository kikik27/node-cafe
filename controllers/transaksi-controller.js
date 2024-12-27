const transaksiModel = require(`../models/index`).transaksi
const detailModel = require(`../models/index`).detail_transaksi
const menuModel = require(`../models/index`).menu
const { Op } = require("sequelize")

exports.addTransaksi = async (request, response) => {
    try {
        let transaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: "lunas"
        }
        let insertTransaksi = await transaksiModel.create(transaksi)

        let transaksiID = insertTransaksi.id
        let arrayDetail = request.body.detail_transaksi

        let totalHargaPerTransaksi = 0;
        let totalHargaPerItem = {};
        
        for (let i = 0; i < arrayDetail.length; i++) {
            arrayDetail[i].id_transaksi = transaksiID
            let menu = await menuModel.findOne({ where: { id: arrayDetail[i].id_menu } })
            arrayDetail[i].harga = menu?.harga 
            arrayDetail[i].total_harga = menu?.harga * arrayDetail[i].qty
        

        totalHargaPerTransaksi += arrayDetail[i].total_harga;

        // Menjumlahkan total harga per item
        if (totalHargaPerItem[arrayDetail[i].id_menu]) {
          totalHargaPerItem[arrayDetail[i].id_menu] += arrayDetail[i].total_harga;
        } else {
          totalHargaPerItem[arrayDetail[i].id_menu] = arrayDetail[i].total_harga;
        }
      }
      
        await detailModel.bulkCreate(arrayDetail)
        return response.json({
            status: true,
            message: `Data transaksi berhasil ditambahkan`,
            totalHargaPerTransaksi: totalHargaPerTransaksi,
            totalHargaPerItem: totalHargaPerItem
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.updateTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        let newData = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: "lunas"
        }
        await transaksiModel.update(newData, { where: { id: id_transaksi } })
        await detailModel.destroy({ where: { id_transaksi: id_transaksi } })
        let arrayDetail = request.body.detail_transaksi
        for (let i = 0; i < arrayDetail.length; i++) {
            arrayDetail[i].id_transaksi = id_transaksi
            let menu = await menuModel.findOne({ where: { id: arrayDetail[i].id_menu } })
            arrayDetail[i].harga = menu?.harga
        }
        await detailModel.bulkCreate(arrayDetail)
        return response.json({
            status: true,
            message: `Data transaksi berhasil diubah`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        await detailModel.destroy({ where: { id_transaksi: id_transaksi } })
        await transaksiModel.destroy({ where: { id: id_transaksi } })
        return response.json({
            status: true,
            message: `Data transaksi berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.findTransaksi = async (request, response) => {
    try {
        const { startDate, endDate, keyword } = request.body;
    
        let result = [];
    
        if (startDate && endDate) {
          result = await transaksiModel.findAll({
            where: {
              [Op.or]: {
                tgl_transaksi: {
                  [Op.gte]: startDate,
                  [Op.lt]: endDate,
                },
              },
            },
          });
        } else if (keyword) {
          result = await transaksiModel.findAll({
            where: {
              nama_pelanggan: { [Op.substring]: keyword },
            },
          });
        } else {
          return response.json({
            status: false,
            message: 'Invalid search parameters',
          });
        }
    
        return response.json({
          status: true,
          data: result,
        });
      } catch (error) {
        return response.json({
          status: false,
          message: error.message,
        });
      }
    };

exports.getTransaksi = async (request, response) => {
    try {
        let result = await transaksiModel.findAll({
            include: [
                "meja", "user", {
                    model: detailModel,
                    as: "detail_transaksi",
                    include: ["menu"]
                }
            ]
        })
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}