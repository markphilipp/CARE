import * as express from 'express';

const app = express();

// Watch the build folder
app.use(express.static('build'));
const server = app.listen(3000);

export default server;