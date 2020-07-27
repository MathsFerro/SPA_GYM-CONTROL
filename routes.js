const express = require('express')

const routes = express.Router()

// importando o arquivo instructors da raiz
const instructors = require('./instructors')
const { renderString } = require('nunjucks')

routes.get('/', (req, res) => res.redirect('instructors'))
routes.get('/instructors', (req, res) => res.render('instructors/index')) 
routes.get('/members', (req, res) => res.render('members/index')) 

routes.get('/instructors/create', (req, res) => res.render('instructors/create'))
routes.post('/instructors', instructors.post)

// :id recebe o id
routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

module.exports = routes