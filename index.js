/**
 * npm run dev, de esta forma se ejecuta este archivo desde nodemon ya que es establecio en el script del package.json
 */
// console.log("my app");

// ! creamos nuestro servidor

const express = require('express');
const app = express();
const port = 3000;

const routerAPI = require('./routes');

// midleware para los metodos post
app.use(express.json());

// middleware para errores, los importamos
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const cors = require('cors');
const whiteList = ['http://localhost:8080', 'http://localhost:5500', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('acceso no permitido'));
    }
  },
};
app.use(cors(options));
// puerto del localhost
app.listen(port, () => {
  console.log('my port: ' + port);
});

app.get('/', (req, res) => {
  res.send('Servidor en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta');
});

// importamos la funcion desde el index de routes.
routerAPI(app);

// definimos los middlewares luego del router
//! estos middlewares no es obligatorio usarlos, pues es una forma de capturar errores, no un impedimento para que el sistema funcione
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
