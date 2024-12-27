const express = require(`express`)
const app = express()

const { authorize } = require(`../controllers/auth-controller`)
const menuController = require(`../controllers/menu-controller`)

app.get(`/menu`,[authorize],menuController.getMenu)
app.post(`/menu`,[authorize],menuController.addMenu)
app.post(`/menu/find`,[authorize],menuController.filterMenu)
app.put(`/menu/:id_menu`,[authorize],menuController.updateMenu)
app.delete(`/menu/:id_menu`,[authorize],menuController.deleteMenu)

module.exports = app