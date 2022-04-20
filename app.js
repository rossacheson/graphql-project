const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require(`./server/schema/schema`);
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.mongoUsername}:${process.env.mongoUserPassword}@cluster0.prqqa.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening for requests on port ${port}`);
    });
  })
  .catch((e) => console.log(`Error: ${e}`));
