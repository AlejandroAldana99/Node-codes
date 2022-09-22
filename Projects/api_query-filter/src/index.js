import express    from "express";
import bodyParser from "body-parser";
import cors       from "cors";

// Require Own Modules
import routes from "./routes";

// Define express and routes
const port   = process.env.PORT || 3000;
const app    = express();
const router = express.Router();

// Allow cors
app.use(cors());
// Parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(router);
app.use("/api", router);

// Listener
app.listen(port, () => console.log(`[Server] Listening on port ${port}`));