const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const multer     = require('multer');

// Require Own Modules
const routes = require('./routes');

const port   = process.env.PORT || 3000;
const upload = multer();
const app    = express();
const router = express.Router();

app.use(cors());
// Parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(router);
app.use("/api", router);

// For multi form data
app.use(upload.any());

app.listen(port, () => console.log(`[Server] Listening on port ${port}`));
