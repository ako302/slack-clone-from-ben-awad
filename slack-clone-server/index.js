import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import models from './models';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const app = express();
app.use(cors('*'));

const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: {
        models,
        user: {
            id: 1,
        },
    },
});

// bodyParser is needed just for POST.
const graphqlEndpoint = '/graphql';
server.applyMiddleware({ app,graphqlEndpoint});

models.sequelize.sync().then(() => {
    app.listen(8080, () =>
        console.log(
            `🚀 Server ready at http://localhost:8080${server.graphqlPath}`
        )
    );
});
