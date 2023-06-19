const express = require('express')
const app = express()
const config = require('./config.js');


app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('Here')
    res.render('index')
    
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)

app.listen(8080)
