const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // Added bodyParser for parsing request bodies

app.use(cors());
app.use(bodyParser.json()); // Added for parsing JSON bodies

const cars = require('./cars.json');
module.exports = app;
// Get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// Get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ message: "Car not found" });
    }
});

// Update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars[index] = updatedCar;
        res.json(updatedCar);
    } else {
        res.status(404).json({ message: "Car not found" });
    }
});

// Delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars.splice(index, 1);
        res.json({ message: `Car with id ${id} deleted` });
    } else {
        res.status(404).json({ message: "Car not found" });
    }
});

// Add car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar); // Changed status to 201 for created resource
});

// Start app at localhost:3001
const PORT = process.env.PORT || 3001; // Added default port 3001
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});