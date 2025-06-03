const express = require('express')
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
const { EXPRESS_CONFIG, MONGO_CONFIG } = require('./config')
const authorRouter = require('./routes/author.routes')
const bookRouter = require('./routes/book.routes')


const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/authors', authorRouter)
app.use('/books', bookRouter)

mongoose.connect(MONGO_CONFIG.URI)
    .then(()=>console.log({message:'base de datos conectada'}))
    .catch(()=>console.log({message:'base de datos NO conectada'}))

app.listen(EXPRESS_CONFIG.PORT, ()=> console.log({message: 'app listen to port' + EXPRESS_CONFIG.PORT , date: new Date().toLocaleString()}))