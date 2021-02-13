require("make-promises-safe");
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT;
const server = app({ logger: true });

const start = async () => {
  try {
    await server.listen({ port: Number(PORT), host: "::" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(address, port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
