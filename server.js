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
    const winesName = req.params.wineName.toLowerCase();
    infoCollection.find().toArray()
      .then(results => {
        const matches = results.filter(wine => wine.name.toLowerCase().includes(winesName));
  
        res.json(matches);
      })
      .catch(error => console.error(error))
  })


  app.get('/api/', (req, res) => {
    infoCollection.find().toArray()
      .then(results => {
        res.json(results);
      })
      .catch(error => console.error(error))
  })

  app.get('/api/year/:wineVintage', (req, res) => {
    const winesVintage = req.params.wineVintage
    infoCollection.find().toArray()
      .then(results => {
        const matches = results.filter(wine => wine.vintage.includes(winesVintage));
        console.log(matches)
        res.json(matches);
      })
      .catch(error => console.error(error))
  })

  app.get('/api/match/:vintage.:price.:variety', (req, res) => {
    const winesVintage = req.params.vintage
    const winesPrice = req.params.price
    const winesVariety = req.params.variety

    infoCollection.find().toArray()
      .then(results => {
        const matches = results.filter
        (wine => wine.vintage.includes(winesVintage) && 
                 wine.price.includes(winesPrice) &&
                 wine.variety.toLowerCase().includes(winesVariety));
        res.json(matches);
      })
      
      .catch(error => console.error(error))
  })
//   app.get('/api/match/:vintage.:price.:variety', (req, res) => {
//     const winesVintage = req.params.vintage
//     const winesPrice = req.params.price
//     const winesVariety = req.params.variety.toLowerCase()

//     infoCollection.find({vintage: winesVintage, price: winesPrice, variety: winesVariety}).toArray()
//     .then(results => {
//         console.log(results)
//         res.json(results[0])
//     })
//     .catch(error => console.error(error))
// })
  

})
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`the server is running on PORT ${PORT}!`)
})



//mayanwolfe tutorial for wineName
// app.get('/api/:wineName', (req, res) => {
//     const winesName = req.params.wineName.toLowerCase()
//     infoCollection.find({id: winesName}).toArray()
//     .then(results => {
//         console.log(results)
//         res.json(results[0])
//     })
//     .catch(error => console.error(error))
// })
//mayanwolfe tutorial but attempted for vintage. DOESNOT work!
// app.get('/api/:wineVintage', (req, res) => {
//     const winesVintage = req.params.wineVintage.toString()
//     infoCollection.find({vintage: winesVintage}).toArray()
//     .then(results => {
//         console.log(winesVintage)
//         console.log(wineVintage)
//         console.log(results)
//         res.json(results[0])
//     })
//     .catch(error => console.error(error))
// })

//////////////////////////
//SPRINT 2
//////////////////
//either make it return all the objects 
//and/or
//make a route that can handle multiple parameters
