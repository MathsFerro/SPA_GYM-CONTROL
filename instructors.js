// Modulo do próprio node
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// edit
exports.edit = (req, res) => {
    const { id } = req.params
    
    const foundInstructor = data.instructors.find((instructor) => instructor.id == id)

    if(!foundInstructor)
        return res.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return  res.render('instructors/edit', { instructor })
}

// show
exports.show = (req, res) => {
    // req.query.id -> Passava como ?id=1, e recebia no req.query
    // req.body -> Pega do formulário através do post
    // req.params.id = /:id -> recebe através da url
    const { id } = req.params
    
    // find retorna true ou false, e armazena os dados do instructor
    const foundInstructor = data.instructors.find((instructor) => instructor.id == id)

    if(!foundInstructor)
        return res.send('Instructor not found')

    // ... foundInstructor vai colocar tudo que tem dentro do objeto foundInstructor ( Spread )
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("en-US").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })
}


// create
exports.post = (req, res) => { 
    //req.querie -> Receber os dados
    //req.body -> Corpo da requisição post // precisa do server.use(express.urlencoded({ extended: true }))
    
    // Constructor chamado Object
    // Uma função que cria um objeto, possui diversas funcionalidades
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "")
            return res.send('Please, fill all fields')
    }

    let { avatar_url, birth, name, services, gender } = req.body


    // Aula Trabalhando com dados em JSON
    
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)
    
    // Inserindo no array instructors dentro do data.json, os dados do req.body 
    //data.instructors.push(req.body)
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    // fs.writeFile -> Onde iremos escrever o aquivo e os dados
    // JSON.stringify -> transforma em JSON
    // callback function -> É uma função que vai ser executada depois de alguma coisa, 
    //nesse caso depois de escrever o arquivo data.json
    // dentro do stringify, conseguimos fazer a formatação para visualizarmos no data.json (nesse caso é o número 2)
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect("/instructors")
    })

}

// update



// delete



