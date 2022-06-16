const {response} = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const { privateDecrypt } = require('crypto')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://wineapiuser:R8bJ*wwqrgRg6M9@cluster0.fisjggb.mongodb.net/?retryWrites=true&w=majority'

app.use (cors())


MongoClient.connect(connectionString)
    .then(client => {
        console.log('connected to database')
        const db = client.db('wine')
        const infoCollection = db.collection('High-price')
       
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:wineName', (req, res) => {
    const winesName = req.params.wineName.toLowerCase()
    infoCollection.find({name: winesName}).toArray()
    .then(results => {
        console.log(results)
        res.json(results[0])
    })
    .catch(error => console.error(error))
})

})
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`the server is running on PORT ${PORT}!`)
})