const express = require('express')
const hbs = require('hbs')
const path = require('path')
const { resourceUsage } = require('process')
const publicPath = path.join(__dirname, 'public')

app = express()
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index',{
    title: 'Weather'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
    title: 'About'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact',{
    title: 'Contact'
    })
})

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.send('404 Page not found')
})

hbs.registerPartials(path.join(__dirname, 'partials'), (error) => {})
app.listen(3000)