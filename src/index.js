import { access, constants, writeFile } from 'fs';
import Router from '@koa/router';
import Koa from 'koa';
import { default as koaBody } from 'koa-body';
import KoaLogger from 'koa-logger';
import cors from '@koa/cors';
const app = new Koa();

const router = new Router();

const datosFronted = [];

router.get('/', (ctx, next) => {
  ctx.response.body = { message: 'Hello world!' };
  ctx.status = 200;
});

router.post('/Fronted', async (ctx) => {
  const nuevosDatosFronted = ctx.request.body;

  try {
    // Verificar si tienes permisos de escritura en la carpeta
    await verificarPermisos();

    // Agregar los nuevos datos a datosFronted
    datosFronted.push(nuevosDatosFronted);

    // Guardar los datos en el archivo
    await guardarDatosFrontedEnArchivo();

    ctx.body = { message: 'Datos de Fronted agregados correctamente' };
  } catch (error) {
    console.error('Error al guardar los datos de Fronted:', error);
    ctx.body = { message: 'Error al guardar los datos de Fronted' };
  }
});

async function verificarPermisos() {
  return new Promise((resolve, reject) => {
    access(__dirname, constants.W_OK, (err) => {
      if (err) {
        reject('No tienes permisos de escritura en esta carpeta.');
      } else {
        resolve();
      }
    });
  });
}

async function guardarDatosFrontedEnArchivo() {
  return new Promise((resolve, reject) => {
    const datosJSON = JSON.stringify(datosFronted, null, 2);

    writeFile('datosFronted.json', datosJSON, err => {
      if (err) {
        reject('Error al guardar los datos de Fronted en el archivo JSON');
      } else {
        console.log('Datos de Fronted guardados en el archivo JSON');
        resolve();
      }
    });
  });
}

app.use(KoaLogger());
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});