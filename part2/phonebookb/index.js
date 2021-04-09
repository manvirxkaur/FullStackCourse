const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app=express()
app.use(cors())
app.use(express.json())
morgan.token('body', function(req, res, param) {
  if (req.method !== 'POST') { return ' ' }
	return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons =[
          {
            "name": "Arto Hellas",
            "number": "38483",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
          },
          {
            "name": "ok",
            "number": "93753985",
            "id": 5
          },
          {
            "name": "nf",
            "number": "9593",
            "id": 6
          }
        ]

app.get('/info', (request, response) => {
    const date =new Date();
    response.send(`
    <div>Phonebook has info for ${persons.length} people</div><br>
    <div>${date}</div>
    `)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id=Number(request.params.id)
    const person =persons.find(person=>person.id===id)
    if(person)
    response.json(person)
    else
    response.status(404).end()
  })

  const generateId = () => {
    const id = parseInt(Math.random() * 100000000, 10)
    return id
  }
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
  
    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }
  
    if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
    console.log(JSON.stringify(person))
  })
  

app.delete('/api/persons/:id', (request, response) => {
    const id=Number(request.params.id)
    persons=persons.filter(person=>person.id!==id)
    response.status(204).end()
  })


const PORT=process.env.PORT||3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)