var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/graphql-exp')
  .then(() => console.log('Connected!'));
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(age: Int): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
  },
  input UserInput {
    id: Int
    name: String
    age: Int
  },
  type Mutation {
    updateUser(input: UserInput): Person
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  user: (args) => {
    console.log('args in getUser ',args)
    return {
        id:1,
        name:"Zunnurain Badar",
        age:20
    };
  },
  users: (args) => {
    console.log('args in getUsers ',args)
    return [{
        id:1,
        name:"Zunnurain Badar",
        age:20
    },{
      id:2,
      name:"Zunnurain Badar 1",
      age:201
  }];
  },
  updateUser: (parent, quote) =>{
    const id = parent.input.id;
    const name = parent.input.name;
    const age = parent.input.age;
    console.log('id ',id)
    console.log('name ',name)
    console.log('age ',age)
    return {
      id:id,
      name:name,
      age:age
  }
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');