import express from 'express';
import cors from 'cors';
import path from 'path'
import routes from './routes'; // coloca um ./ por que é um arquivo da minha aplicação, se for um caminho que vem do nodemodules eu não utilizo
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..','uploads')))

app.use(errors());

app.listen(3333);