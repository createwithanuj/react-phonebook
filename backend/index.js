const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());



app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  if (person) {
  response.json(person);
  } else {
  response.status(404).json({ error: 'Person not found' });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  const personExists = persons.some(person => person.id === id);

  if (personExists) {
  persons = persons.filter(person => person.id !== id);
  console.log(`Deleted person with id ${id}`);
  response.status(204).end();
  } else {
  response.status(404).send({ error: 'Person not found' });
  }
});

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if (!person.name || !person.number) {
  return response.status(400).json({
    error: 'name or number missing'
  });
  }
  if (persons.find(p => p.name === person.name)) {
  return response.status(400).json({
    error: 'name must be unique'
  });
  }
  if (persons.find(p => p.number === person.number)) {
  return response.status(400).json({
    error: 'number must be unique'
  });
  }
  const newPerson = {
  id: String(Math.round(Math.random() * 1000).toString()),
  name: person.name,
  number: person.number
  };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const existingPersonIndex = persons.findIndex(p => p.id === id);

  if (existingPersonIndex !== -1) {
    const updatedPerson = { ...persons[existingPersonIndex], ...person };
    persons[existingPersonIndex] = updatedPerson;
    response.json(updatedPerson);
  } else {
    response.status(404).json({ error: 'Person not found' });
  }
}
);
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});