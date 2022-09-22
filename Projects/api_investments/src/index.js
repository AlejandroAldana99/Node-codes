import express    from "express";
import bodyParser from "body-parser";
import cors       from "cors";
// Require Own Modules
import db     from "./Config/database";
import routes from "./routes";

const port   = process.env.PORT || 3000;
const app    = express();
const router = express.Router();

// Init DB
db();

app.use(cors());
// Parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(router);
app.use("/api", router);

app.listen(port, () => console.log(`[Server] Listening on port ${port}`));
