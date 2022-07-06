const express = require('express');
const router = express.Router()
const app = express();
const cors = require('cors');
const bp = require('body-parser')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors(corsOptions));

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'postgres'
})

client.connect()


app.listen(3001, function(){
    console.log("Node Js Server is Running");

})

app.post('/login', async (req, res) => {
    const nom =''
    const prenom=''
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM utilisateur WHERE email=$1',
        values: [email]
    })

    if (result.rows.length === 0) {
        res.status(401).json({
            message: 'user doesnt exist'
        })
        return
    }
    // si on a pas trouv� l'utilisateur
    // alors on le cr�e
    const user = result.rows[0]

    if (await bcrypt.compare(password, user.password)) {
        // alors connecter l'utilisateur
        //req.session.userId = user.id
        res.json({
            id: user.iduser,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        })
    } else {
        res.status(401).json({
            message: 'bad password'
        })
        return
    }
})

app.post('/register', async (req, res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM utilisateur WHERE email=$1',
        values: [email]
    })

    if (result.rows.length > 0) {
        res.status(401).json({
            message: 'user already exists'
        })
        return
    }
    // si on a pas trouv� l'utilisateur
    // alors on le cr�e

    const hash = await bcrypt.hash(password, 10)

    await client.query({
        text: `INSERT INTO utilisateur(nom,prenom,email, password)
    VALUES ($1, $2, $3, $4)
    `,
        values: [nom,prenom, email, hash]
    })
    return res.json({ok:true});
    
})


module.exports = router