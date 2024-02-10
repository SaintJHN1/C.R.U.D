const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const app = express()


app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hell!, Node Api')
})
app.get('/blog', (req, res) => {
    res.send('Hello!, Blog')
})

app.get('/user', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/user', async (req, res) => {
    console.log(req.body)
    res.send(req.body)
    try {
        const user = await User.create(req.body)
        res.status(200).json(User)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id);
        if (!user) {
            returnres.status(404).json({ message: `cannot find any user with ID ${id}` })
        }
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `cannot find any user with ID ${id}` })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.patch('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await User.findByIdAndUpdate(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any user with ID ${id}` })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


mongoose.set("strictQuery", false)
mongoose.connect('mongodb://localhost:27017')

    .then(() => {
        console.log('connected to mongoDB')
        app.listen(4000, () => {
            console.log('Node API app is running on port 4000')
        });
    }).catch((error) => {
        console.log(error)
    })