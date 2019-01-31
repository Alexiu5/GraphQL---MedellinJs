'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const pg = require('pg')

const typeDefs = fs.readFileSync(path.join(__dirname, 'api', 'schema.graphql'), 'utf-8')
const resolvers = require('./api/resolvers')


//Setting the Dev enviroment variables
if (process.env.NODE_ENV === 'development'){
    require('dotenv').config({path: 'development.env'})
}

// create a new pg object  
const pgPool = new pg.Pool({connectionString: process.env.DATABASE_URL})

//Express initialization 
const app = express()

app.set('port', process.env.PORT || 7000)
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended:true}))

//Helps to relationate the schemas with the resolvers
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use('/',(req, res)=>{
    graphqlHTTP({
        schema,
        graphiql: true,
        context: {pgPool}
    })(req, res)
})


//init app
const server = app.listen(app.get('port'), ()=>{
    console.log(`i'm using port -> ${server.address().port}`)
})

module.exports = app