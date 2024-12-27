const express = require(`express`)
const app = express()

app.use(express.json())
const { authorize,authenticate } = require(`../controllers/auth-controller`)
const userController = require(`../controllers/user-controller`)
// let { validateUser } = require(`../middlewares/user-validation`)

app.get(`/user`,[authorize],userController.getUser)
app.post(`/user/find`,[authorize],userController.findUser)
app.post(`/user`,[authorize],userController.addUser)
app.put(`/user/:id_user`, [authorize],userController.updateUser)
app.delete(`/user/:id_user`,[authorize],userController.deleteUser)

module.exports = app