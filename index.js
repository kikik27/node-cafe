const express = require(`express`)
const app = express()

const PORT = 8000

const cors = require(`cors`)
const auth = require(`./routes/auth-route`)

app.use(cors())
app.use(express.static(__dirname))
app.use(`/auth`, auth)

const mejaRoute = require(`./routes/meja-route`)
const menuRoute = require(`./routes/menu-route`)
const userRoute = require(`./routes/user-route`)
const transaksiRoute = require(`./routes/transaksi-route`)

app.use(`/`,mejaRoute)
app.use(`/`,menuRoute)
app.use(`/`,userRoute)
app.use(`/`,transaksiRoute)


app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})













// const express = require(`express`)
// const app = express()
// const PORT = 8000
// const cors = require(`cors`)
// app.use(cors())
// app.use(express.static(__dirname))
// const mejaRoute = require(`./routes/meja-route`)
// const transaksiRoute = require(`./routes/transaksi-route`)
// app.use(`/meja`,mejaRoute)
// app.use(`/transaksi`,transaksiRoute)
//prefix adalah bagian awal dari URL yang akan digunakan untuk mengakses rute tertentu. 
//route adalah file JavaScript yang berisi logika untuk menangani permintaan HTTP pada rute tersebut.
// let routes = [
//     {prefix: `/user`, route: require(`./routes/user-route`)}, 
//     {prefix: `/menu`, route: require(`./routes/menu-route`)},
//     {prefix: `/meja`, route: require(`./routes/meja-route`)},
//     {prefix: `/transaksi`, route: require(`./routes/transaksi-route`)},
//     {prefix: `/auth`, route: require(`./routes/auth-route`)}
// ]
// for (let i = 0; i < routes.length; i++) {
//     app.use(routes[i].prefix, routes[i].route)
// }
// app.listen(PORT, () => {
//     console.log(`Server run on port ${PORT}`)
// })
// const auth = require(`./routes/auth-route`)
// app.use(`/auth`, auth)
// const menuRoute = require(`./routes/menu-route`)
// const userRoute = require(`./routes/user-route`)
// app.use(`/menu`,menuRoute)
// app.use(`/user`,userRoute)
// app.listen(PORT, () => {
//     console.log(`Server run on port ${PORT}`)
// })