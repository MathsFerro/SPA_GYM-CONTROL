const express = require('express')

const nunjucks = require('nunjucks')

const server = express()

const routes = require('./routes')

// Middlewares -> Intercepta do ponto A para o ponto B, colocando coisas no caminho 
// Usamos o urlencoded para passar os dados 
server.use(express.urlencoded({ extended: true }))

server.use(express.static("public"))
server.use(express.static("public/img"))

server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, () => {
    console.log('server is running')
})


// RE-ASSISTIR AULA "RECARREGANDO A PAGINA AUTOMATICAMENTE COM BROWSER SYNC MODULE CONTROLE ACADEMIA"
// Instalar o reload automatico browser,
// npm install browser-sync npm-run-all -D
// -D -> Dependências de Desenvolvimento
// Adicionar no package.json 

