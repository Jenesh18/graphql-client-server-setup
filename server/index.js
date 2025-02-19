const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`#graphql
         type User {
           id:ID! 
           name:String!
           email:String! 
           website:String! 
           phone: String!
           username:String! 
         }

         type Todo {
            id:ID!
            title:String!
            completed:Boolean
            userId:ID!
            user:User
         }

         type Query{
            getTodos:[Todo]
            getAllUsers:[User]
            getUser(id:ID!):User
         }
        `,
        resolvers:{
            Todo:{
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
            },
            Query:{
                getTodos:async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data ,

                getAllUsers:async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

                getUser:async (_ ,args) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)).data,
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server))

    app.listen(8000 , () => console.log("Server started on Port:- 8000"))

}

startServer()
