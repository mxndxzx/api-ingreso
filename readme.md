# Control de Ingresos - REST API
Esta API es consumida por la aplicación [control-ingreso](https://github.com/mxndxzx/control-ingreso) (en proceso) para llevar un registro de los usuarios externos que ingresan al Registro de la Propiedad.

Está basada en un esquema de 4 capas, que incluye:

- **Router:** Enrutador de URL's y peticiones
- **Controller:** Controlador de métodos (GET, POST, PATCH, DELETE) y respuestas de status HTTP
- **Service:** Regla de negocio y retorno de resultados. Se utiliza esta capa por pura seguridad
- **Data Access:** Capa de acceso a la base de datos. Se utiliza Sequelize como librería para consultas

## Utilización
Al día de la fecha, la API no está puesta en producción, por lo que para correrla se debe clonar este repositorio:

```bash
git clone https://github.com/mxndxzx/api-ingreso .
```

Una vez clonado, se deben instalar todas las dependencias de Node.js (detalladas [aqui](#dependencias)):

```bash
npm install
```

Se utilizan variables de ambiente, por lo que se deberá modificar el nombre del archivo `.env-example`, en el root del proyecto, por `.env`. En este archivo hay distintas variables precargadas a modo de ejemplo, por lo que podrían no funcionar dependiendo del entorno en el que se ejecuten.

Recordemos que es requisito tener un servidor de `Postgres` activo para poder utilizar esta api.

Adicionalmente, si se desea que la API haga todo el trabajo, se puede modificar el siguiente parámetro en `src/service/ingreso.service.js`:

```javascript
// Old
this.db.sequelize.sync().then( () => {
    logger.info('Synced DB');
});

// New
this.db.sequelize.sync( {force:true} ).then( () => {
    logger.info('Synced DB');
});
```

Esto creará una nueva tabla cada vez que se inicie la API. Se puede desactivar una vez iniciada por primera vez.

Luego, desde la consola de Node se debe correr el siguiente comando para entrar en modo de desarrollo. Este modo es el único implementado por el momento:

```bash
npm run dev
```

**Listo!** La aplicación estará corriendo en `localhost:3001`


### Rutas
Actualmente existen 5 métodos posibles:

- *GET* `/api/v1/users/:userId` devuelve todos los registros para una misma persona. La petición requiere el DNI del usuario pasado como Query Parameter

- *GET* `/api/v1/date/:date` devuelve todos los registros de un mismo día. La petición requiere la fecha como Query Parameter. Acepta estos dos formatos:
    ```bash
    YYYYMMDD
    DD-MM-YYYY
    ```
- *POST* `/api/v1/create` crea un registro de ingreso. La petición requiere:
    ```json
    {
        "user_surname": "<apellido>",
        "user_name": "<nombre>",
        "user_id": "99999999",
        "type": "<ingreso / egreso>",
        "area": "<nro area / departamento>",
        "description": "<observaciones>"
    }
    ```
- *PATCH* `/api/v1/update` ---> NO IMPLEMENTADO
- *DELETE* `/api/v1/delete` ---> NO IMPLEMENTADO

## Versionado de las rutas
Se trabaja bajo el modelo de versiones, que propone crear rutas tales como `/api/v1/<method>` para que todas las aplicaciones que consuman esta API se mantengan funcionando. De esta manera, si más adelante se crea una segunda versión (`/api/v2/<method>`), las aplicaciones que consuman `/v1/` podrán seguir funcionando sin interrupciones

# Esquema de la API

## Estructura de archivos
Las carpetas se organizan de la siguiente manera:
```bash
control-ingreso/
├── node_modules/  # Módulos de Node.js
├── src/
│   ├── config/
│   │   └── db.config.js  # Métodos de sequelize
│   ├── controller/
│   │   └── ingreso.controller.js  # Controlador de métodos (HTTP)
│   ├── logger/
│   │   └── api.logger.js  # Logger (pine.js)
│   ├── model/
│   │   └── ingreso.model.js  # Modelo de la BD
│   ├── services/
│   │   └── ingreso.service.js  # CRUD de la BD
│   └── v1/
│       └── routes/
│           └── ingreso.routes.js  # Rutas (url's)
├── .env  # Variables ambiente
├── .gitignore  # Files que ignora GIT
├── package-lock.json
├── package.json  # Scripts de Node.js
└── server.js  # Root file
```

> `.env` y `node_modules` no se incluyen en el repositorio

## Dependencias
Este proyecto depende fuertemente de las siguientes librerías:

- **Body Parser** *v1.20.1* --> Middleware que parsea los datos de las peticiones antes de manipularlas. Se accede mediante `req.body`
- **CORS** *v2.8.5* --> Permite la comunicación segura bajo protocolo para poder consumir la API
- **Dotenv** *v16.0.3* --> Crea variables de ambiente en el entorno de ejecución de Node, accesible por `process.env`
- **Error Handler** *v1.5.1* --> Gestor de errores para distintos entornos de la API
- **Express** *v4.18.2* --> Framework principal que facilita la creación de servicios. Provee rutas personalizadas, HTTP helpers, herramientas de testing, etc.
- **Lodash** *v4.17.21* --> Facilita la manipulación de objetos y arrays
- **Nodemon** *v2.0.20* --> Activa 'live reload' para no tener que reiniciar la api cada vez que se hagan cambios. Está instalada solo en el entorno `dev`
- **PG** *v8.9.0* --> Punto de acceso a Postgres. Incluye drivers y parámetros de conexión
- **Pine** *v1.1.1* --> Logger. Pienso cambiarlo en un futuro
- **Sequelize** *v6.28.0* --> Query handler para Postgres. Valida métodos y datos