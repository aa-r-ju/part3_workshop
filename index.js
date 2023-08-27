const express = require('express')
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  app.use(requestLogger)


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note) {
        response.json(note)
    } else {
        response.status(404).send(`There are no notes at ${id}`)
    }
  })
  

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).send(`The note at id ${id} has been deleted`)
  })


  app.post('/api/notes', (request, response) => {
    const note = request.body   
    note.id = notes.length+1
    console.log(note)
    notes.push(note)
    response.json(note).status(201)
  })
  
  app.use((request,response,next) => {
    response.status(404).send("no code available to handle this request")
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)