const express = require("express");
const app = express();
var morgan = require('morgan')




// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

// morgan('tiny')

app.use(express.json());

const logging = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req,res)
  ].join(' ')
})

app.use(logging)

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (req, res) => {
    const now = new Date();
    const msg = 
`Phonebook has info for ${persons.length} <br/>${now}`

    console.log(now);
    console.log(msg)
    res.send(
        msg
    );
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if( person) {
        res.json(person)
    }else {
        res.status(404).end()
    }
})

const generateId = () => {
    return  Math.floor((Math.random() * 100000))
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if ( !body.name || !body.number){
        return res.status(400).json({
            error:"name or number missing"
        })
    }
    const hasSameName = persons.some(p=>p.name === body.name)
    if(hasSameName){
        return res.status(400).json({
            error:"name must be unique"
        })
    }


    // console.log(body)
    const person = {
        id:generateId(),
        name:body.name,
        number:body.number
    }
    // console.log(person)
    persons = persons.concat(person)
    // console.log(persons)
    res.json(person)

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id 
    persons.filter(p=> p.id !== id)
    res.status(204).end() // send是自动end 然后发送， 但是 status 的话没有，所以还要end

})

app.use(unknownEndpoint)


const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
