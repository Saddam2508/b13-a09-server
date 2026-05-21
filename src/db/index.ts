import { MongoClient, ServerApiVersion } from "mongodb";

import config from "../config";

const uri = config.connection_string;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const initDB = async () => {
  try {
    // await client.connect();
    // Send a ping to confirm a successful connection
    // const result = await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    // return result;
  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
