
const app = require('./app');
const sequelize = require('./config/database');
const exphbs = require('express-handlebars');
const path = require('path');
const Comentarios = require('./models/comentarios'); 
const Contactos = require('./models/contactos'); 
const Datapage = require('./models/datapage');  // Asegúrate de importar el modelo

const PORT = 3000;

// Configuración de Handlebars
defineHandlebars(app);

function defineHandlebars(app) {
    app.engine('handlebars', exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
    }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
}

// Función para mostrar las rutas registradas
function logRoutes(app) {
    console.log('Rutas disponibles:');
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            const method = Object.keys(middleware.route.methods)[0].toUpperCase();
            console.log(`${method} ${middleware.route.path}`);
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((nestedMiddleware) => {
                if (nestedMiddleware.route) {
                    const method = Object.keys(nestedMiddleware.route.methods)[0].toUpperCase();
                    console.log(`${method} ${nestedMiddleware.route.path}`);
                }
            });
        }
    });
}

// Crear el esquema y luego sincronizar la base de datos
(async () => {
    try {
        // Crear esquema si no existe
        await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "14209140";`);
        console.log('Esquema creado o ya existente');

        // Sincronizar la base de datos (creación de tablas)
        await sequelize.sync({ alter: true }); 
        // await sequelize.sync();  // Puedes usar { force: true } si deseas recrear las tablas
        console.log('Base de datos sincronizada correctamente');

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);

            // Mostrar rutas disponibles
            logRoutes(app);
        });
    } catch (error) {
        console.error('Error al crear el esquema o sincronizar la base de datos:', error);
    }
})();

