const app = require('./server');
require('dotenv').config()

app.listen(process.env.PORT || 3333);
