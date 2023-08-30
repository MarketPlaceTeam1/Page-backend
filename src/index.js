

const Router = require('@koa/router');
const Koa = require('koa');
const { default: koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const path = require('path'); // Importa el módulo 'path'
const app = new Koa();
const fs = require('fs');

const router = new Router();

// Declaración de datosFronted
const datosFronted = [];

//----------------------------------------------------------------------------------
router.get('/', (ctx, next) => {
  ctx.response.body = { message: 'Hello world!' };
  ctx.status = 200;
});

router.post('/Fronted', (ctx) => {
  const nuevosDatosFronted = ctx.request.body;

  // Agregar los nuevos datos a datosFronted
  datosFronted.push(nuevosDatosFronted);

  // Guardar los datos en el archivo
  guardarDatosFrontedEnArchivo();

  ctx.body = { message: 'Datos de Fronted agregados correctamente' };
});

router.get('/Fronted', (ctx) => {
  ctx.response.type = 'application/json';
  ctx.response.body = datosFronted;
});

function guardarDatosFrontedEnArchivo() {
  const datosJSON = JSON.stringify(datosFronted, null, 2);
  
  // Obtener la ruta absoluta del archivo usando path.join
  const rutaArchivo = path.join(__dirname, './datosFronted.json');

  fs.writeFile(rutaArchivo, datosJSON, err => {
    if (err) {
      console.error('Error al guardar los datos de Fronted en el archivo JSON:', err);
    } else {
      console.log('Datos de Fronted guardados en el archivo JSON');
    }
  });
}

app.use(KoaLogger());
app.use(cors({ 
  origin: '*', 
  methods: ["GET", "POST", "PUT"] 
}));
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});