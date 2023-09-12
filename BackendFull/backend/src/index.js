import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API eventos');
});

app.use('/',router);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});