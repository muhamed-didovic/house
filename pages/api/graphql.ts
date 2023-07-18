import "reflect-metadata";
// import {NextApiRequest} from "next";
import {schema} from "src/schema";
// import {Context} from "src/schema/context";
// import {prisma} from "src/prisma";
// import {loadIdToken} from "src/auth/firebaseAdmin";

import { ApolloServer } from "@apollo/server";
import { nextHandler } from "apollo-server-nextjs";
import {ImageResolver} from "../../src/schema/image";
import {HouseResolver} from "../../src/schema/house";

// Construct a schema, using GraphQL schema language
const typeDefs = `#graphql
type Query {
    hello: String
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
};

// const imageResolver = new ImageResolver();
// const houseResolver = new HouseResolver();
// const resolvers = [
//   ImageResolver,
//   HouseResolver
// ];

const server = new ApolloServer({
    typeDefs,//: schema,
    resolvers,
});

export default nextHandler(server);

/*const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
    const uid = await loadIdToken(req);

    return {
      uid,
      prisma,
    };
  },
  tracing: process.env.NODE_ENV === "development",
});

const handler = server.createHandler({ path: "/api/graphql" });*/

