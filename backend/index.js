require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/contact');


const app = express();
app.use(cors());

app.use(express.static('dist'));

app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

  
app.get('/api/persons', (request, response) => {
  
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const date = new Date();
    const info = `<p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`;
    response.send(info);
  }).catch(error => {
    response.status(500).send({ error: 'Failed to retrieve information' });
  });
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  Person.findById(id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).send({ error: 'Person not found' });
    }
  }).catch(error => {
    response.status(500).send({ error: 'Failed to retrieve person' });
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then(result => {
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).send({ error: 'Person not found' });
    }
  }).catch(error => {
    response.status(500).send({ error: 'Failed to delete person' });
  });
});

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });
  newPerson.save().then(savedPerson => {
    response.json(savedPerson);
  }).catch(error => {
    response.status(400).json({ error: 'Failed to save person' });
  });
});


app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const updatedPerson = request.body;

  if (!updatedPerson.name || !updatedPerson.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  Person.findByIdAndUpdate(
    id, 
    { number: updatedPerson.number }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updated => {
      if (updated) {
        response.json(updated);
      } else {
        response.status(404).send({ error: 'Person not found' });
      }
    })
    .catch(error => {
      response.status(400).json({ error: error.message });
    });
}
);


app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});