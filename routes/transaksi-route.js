const express = require(`express`)
const app = express()

app.use(express.json())
const { authorize,authenticate } = require(`../controllers/auth-controller`)
const transaksiController = require(`../controllers/transaksi-controller`)

app.get(`/transaksi`,[authorize],transaksiController.getTransaksi)
app.post(`/transaksi`,[authorize],transaksiController.addTransaksi)
app.put(`/transaksi/:id_transaksi`,[authorize],transaksiController.updateTransaksi)
app.delete(`/transaksi/:id_transaksi`,[authorize],transaksiController.deleteTransaksi)
app.post(`/transaksi/find`,[authorize],transaksiController.findTransaksi)
module.exports = app