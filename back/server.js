const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
const User = require("./models/usersSchema")
const bcrypt = require("bcrypt")

const saltKey = 'task4'

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

const app = express()

const dbURI = 'mongodb+srv://ivansshashkovv:Nesomnennoluchshiyparol1@cluster0.stn6gxm.mongodb.net/UsersDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(3001))

app.use(cors(corsOptions))
app.use(bodyParser.json())

const getUserStatusByJwt = async (jwtToken) => {
    if (!jwtToken) {
        return { isValidUser: false }
    }

    const decoded = await jwt.verify(jwtToken, saltKey)
    const user = await User.findOne({ _id: decoded.userId })
    let isValidUser = true

    if (!user) {
        isValidUser = false
    }
    if (user?.isBanned) {
        isValidUser = false
    }

    return { user: user, isValidUser: isValidUser}
}

app.post('/jwtInit', async (req, res) => {
    try {
        const { jwtToken } = req.body
        const { user, isValidUser } = await getUserStatusByJwt(jwtToken)
        if (!isValidUser) {
            return res.status(401).json({message: 'User unavailable'})
        }
        res.status(200).json({ user: user, jwt: jwtToken })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/reg', async (req, res) => {
    try {
        const { username, password, email } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
            registrationDate: new Date(),
            isBanned: false,
        })

        await newUser.save()
        res.status(201).json({ message: req.body})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: 'User not exist' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        if (user.isBanned) {
            return res.status(401).json({ message: 'User is banned' })
        }

        await User.updateOne(
            {username: { $in: username}},
            { $set: { lastLogin: new Date()}}
        )

        const jwtToken = await jwt.sign({ userId: user._id }, saltKey)
        res.status(200).json({
            username: username,
            jwt: jwtToken,
        })

    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.get('/users', async (req, res) => {
    try {
        const accessToken = req.header('accessToken')
        const { isValidUser } = await getUserStatusByJwt(accessToken)
        if (!isValidUser) {
            return res.status(401).json({message: 'User unavailable'})
        }

        const users = await User.find()
        res.status(200).json({ users: users })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/ban', async (req, res) => {
    try {
        const accessToken = req.header('accessToken')
        const { isValidUser } = await getUserStatusByJwt(accessToken)
        if (!isValidUser) {
            return res.status(401).json({message: 'User unavailable'})
        }

        const { idCollection } = req.body
        await User.updateMany(
            {_id: { $in: idCollection}},
            { $set: { isBanned: true}}
        )
        const updatedUsers = await User.find()
        res.status(200).json({ users: updatedUsers })
    } catch (error) {
        res.status(500).json({ error: 'Request failed' })
    }
})

app.post('/unban', async (req, res) => {
    try {
        const accessToken = req.header('accessToken')
        const { isValidUser } = await getUserStatusByJwt(accessToken)
        if (!isValidUser) {
            return res.status(401).json({message: 'User unavailable'})
        }

        const { idCollection } = req.body
        await User.updateMany(
            {_id: { $in: idCollection}},
            { $set: { isBanned: false}}
        )
        const updatedUser = await User.find()
        res.status(200).json({ users: updatedUser })
    } catch (error) {
        res.status(500).json({ message: 'Request failed' })
    }
})

app.post('/delete', async (req, res) => {
    try {

        const accessToken = req.header('accessToken')
        const { isValidUser } = await getUserStatusByJwt(accessToken)
        if (!isValidUser) {
            return res.status(401).json({message: 'User unavailable'})
        }

        const {idCollection} = req.body
        await User.deleteMany(
            {_id: { $in: idCollection}},
        )
        const updatedUser = await User.find()
        res.status(200).json({ users: updatedUser })
    } catch (error) {
        res.status(500).json({ message: 'Request failed' })
    }
})

