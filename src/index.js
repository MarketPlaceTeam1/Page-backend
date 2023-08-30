PORT = 3000;

const fs = require ('fs')
const Router = require("@koa/router");
const Koa = require("koa");
const { default: koaBody } = require("koa-body");
const KoaLogger = require("koa-logger");
const cors = require("@koa/cors");
const app = new Koa();

const router = new Router();





//----------------------------------------------------------------------------------
router.get("/", (ctx, next) => {
    ctx.response.body = { message: "Hello world!" };
    ctx.status = 200;
});

router.post('/Fronted', (ctx) => {
  const datosFronted = ctx.request.body;
  

  guardarDatosFrontedEnArchivo(datosFronted)

  ctx.body = { message: 'Datos agregados correctamente' };
});


router.get('/Fronted', (ctx) => {
    ctx.response.type = 'application/json'; 
    ctx.response.body = datosArray; 
});

function guardarDatosFrontedEnArchivo(datosFronted) {
  // Leer el contenido actual del archivo si existe
  let datosExistentes = [];
  try {
    const archivoExistente = fs.readFileSync('datosFronted.json', 'utf-8');
    datosExistentes = JSON.parse(archivoExistente);
  } catch (error) {
    // El archivo no existe o no se pudo leer, lo manejamos más adelante
  }

  // Agregar los nuevos datos a los datos existentes
  datosExistentes.push(datosFronted);

  // Guardar los datos en el archivo JSON
  const datosJSON = JSON.stringify(datosExistentes, null, 2);

  fs.writeFile('datosFronted.json', datosJSON, err => {
    if (err) {
      console.error('Error al guardar los datos de Fronted en el archivo JSON:', err);
    } else {
      console.log('Datos de Fronted guardados en el archivo JSON');
    }
  });
}

app.use(KoaLogger());
app.use(cors({ 
    origin: "*" 
    , methods : ["GET", "POST, PUT"]}));
app.use(koaBody());


app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`);
});

