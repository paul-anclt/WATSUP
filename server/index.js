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
        text: `INSERT INTO utilisateur(email, password)
    VALUES ($1, $2)
    `,
        values: [email, hash]
    })
    return res.json({ok:true});
    
})

app.get('/userConnections/:id',async (req, res) => {
    const idUser = req.params.id

    const result = await client.query({
        text: 'SELECT * FROM connecter WHERE iduser=$1',
        values: [idUser]
    })

    res.json(result.rows)
});

app.get('/plateformes', async(req, res) => {
    const result = await client.query({
        text: 'SELECT * FROM plateforme'
    })

    res.json(result.rows)
})

app.post('/addConnection', async(req, res) => {
    const idPlateforme = req.body.idPlateforme
    const idUser = req.body.idUser
    const publicToken = req.body.publicToken
    const privateToken = req.body.privateToken

    await client.query({
        text: `INSERT INTO public.connecter(idplateforme, iduser, publictoken, privatetoken)
            VALUES ($1, $2, $3, $4);
    `,
        values: [idPlateforme, idUser, publicToken, privateToken]
    })
    return res.json({ok:true});
})

app.delete('/deleteConnection/:id',async (req, res) => {
    const id = req.params.id

    const result = await client.query({
        text: `DELETE FROM connecter
        WHERE idConnecter=$1;`,
        values: [id]
    })

    return res.json({ok:true});
});

module.exports = router