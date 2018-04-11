import { join } from 'path';
import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(express.static(CLIENT_PATH));
app.use(morgan('dev'));
app.use(express.json());

configurePassport(app);

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
