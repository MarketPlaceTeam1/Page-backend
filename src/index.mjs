const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');

const Router = require('@koa/router');
const Koa = require('koa');
const { default: koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const app = new Koa();

const router = new Router();

const datosFronted = [];

//----------------------------------------------------------------------------------
router.get('/', (ctx, next) => {
  ctx.response.body = { message: 'Hello world!' };
  ctx.status = 200;
});

router.post('/Fronted', async (ctx) => {
  const nuevosDatosFronted = ctx.request.body;

  datosFronted.push(nuevosDatosFronted);

  // Guardar los datos en el archivo
  await guardarDatosFrontedEnArchivo();

  ctx.body = { message: 'Datos de Fronted agregados correctamente' };
});

router.get('/Fronted', (ctx) => {
  ctx.response.type = 'application/json';
  ctx.response.body = datosFronted;
});

async function guardarDatosFrontedEnArchivo() {
  const datosJSON = JSON.stringify(datosFronted, null, 2);
  const rutaArchivo = path.join(__dirname, './datosFronted.json');

  try {
    await fs.writeFile(rutaArchivo, datosJSON);
    console.log('Datos de Fronted guardados en el archivo JSON');
  } catch (error) {
    console.error('Error al guardar los datos de Fronted en el archivo JSON:', error);
  }
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