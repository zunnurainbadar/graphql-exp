var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Info {
    first_name:String,
    last_name:String,
    age:Int,
    cnic:String
  }
  type Query {
    getMyInfo: Info
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getMyInfo: () => {
    return {
        first_name:"Zunnurain",
        last_name:"Badar",
        age:20,
        cnic:123456789
    };
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');