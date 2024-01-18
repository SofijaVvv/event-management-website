mkdir config routes

touch index.js
touch package.json
touch knexfile.js

cat << EOF >> package.json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "knex": "^3.1.0",
    "mysql": "^2.18.1",
    "router": "^1.3.8"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
EOF


cat << EOF >> knexfile.js
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '',
      database : 'gland'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

EOF

cat << EOF >> index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/user.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);


const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => console.log(`listening at port ${port}`))
EOF


cd config
touch auth.js
touch db.js
touch settings.js


cat << EOF >> auth.js
const database = require(".//db.js")
const jwt = require('jsonwebtoken');
const settings = require("../config/settings.js")
function authenticate(request, response, next) {
    const authHeader = request.get("Authorization")
    const token = authHeader.split(" ")[1]
    const secret =  settings.SECRET_KEY
    jwt.verify(token, secret, (error, payload) => {
        console.log("Payload: ", payload)
        if(error) return response.json({error: true, message: error.message})
        database("app_operateri")
            .where({email: payload.username})
            .first()
            .then(user => {
                request.user = user
                next()
            })
        //   response.json({error: false, message: "Login ok"})
        //   next()
    })
}
module.exports = authenticate
EOF


cat << EOF >> db.js
const dbEngine = "development"
const config = require("../knexfile")[dbEngine]



module.exports = require("knex")(config)
EOF


cat << EOF >> settings.js
SECRET_KEY = "5AAARXLP2BR3IGKM3JAZS4U2ITF3MO23"
module.exports = {
    SECRET_KEY
}
EOF

cd ..
cd routes
touch user.js
cat << EOF >> user.js
const express = require("express")
const router = express.Router()
const database = require("../config/db.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const settings = require("../config/settings.js")
const authenticate = require("../config/auth.js")
//
router.post("/users", ( request, response ) => {
  const  user  = request.body
  console.log("Request body: ", request.body, user)
  bcrypt.hash(user.password, 12)
      .then(hashed_password => {
        return database("app_operateri")
            .insert({
              email: user.username,
              lozinka: hashed_password,
                ime: user.ime,
              appfirme_id: user.appfirme_id,
              telefon: user.telefon,
              aktivan: user.aktivan,
              kljuc: "1232",
              kodoperatera: "234"
            })
            .returning("*")
            .then(users => {
              const user = users[0]
              response.json({ user })
            }).catch(error => {
              response.json({ error: error.message })
            })
      })
})

router.post("/login", ( request, response ) => {
  const  user  = request.body
  database("app_operateri")
      .where({email: user.username })
      .first()
      .then(retrievedUser => {
        if(!retrievedUser) throw new Error("user not found!")
        return Promise.all([
          bcrypt.compare(user.password, retrievedUser.lozinka),
          Promise.resolve(retrievedUser)
        ]).then(results => {
          const areSamePasswords = results[0]
          if(!areSamePasswords) throw new Error("wrong Password!")
          const user = results[1]
          const payload = {username: user.email}
          const secret =  settings.SECRET_KEY
            console.log("Payload: ", payload, user)
          jwt.sign(payload, secret, (error, token) => {
            if(error) return response.json({error: true, message: error.message})
            console.log("Token: ", token)
            response.json({error: false, token})
          })
        })
      })
})

router.get('/someRoute', authenticate, (request, response) => {
  response.json({message: "You are authorized!" })
})


module.exports = router

EOF