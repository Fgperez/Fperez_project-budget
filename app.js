// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const exphbs = require('express-handlebars');
// const userRoutes = require('./routes/userRoutes');
// const infoRoutes = require('./routes/infoRoutes');
// const comentariosRoutes = require('./routes/comentariosRoutes');
// const errorHandler = require('./middlewares/errorHandler');

// const app = express();
// app.use(bodyParser.json());

// // Configuración de Handlebars
// app.engine('handlebars', exphbs.engine({
//     defaultLayout: 'main',
//     layoutsDir: path.join(__dirname, 'views', 'layouts'),
// }));
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

// // Servir la página principal
// app.get('/', (req, res) => {
//     res.render('home', { title: 'Inance - Home' });
// });

// // Ruta para la página About
// app.get('/about', (req, res) => {
//     res.render('about', { title: 'Inance - About' });
// });

// // Ruta para la página Services
// app.get('/services', (req, res) => {
//     res.render('services', { title: 'Inance - Services' });
// });

// // Ruta para la página Contact
// app.get('/contact', (req, res) => {
//     res.render('contact', { title: 'Inance - Contact' });
// });

// // Rutas API
// app.use('/api', userRoutes);
// app.use('/api', infoRoutes);
// app.use('/api', comentariosRoutes);

// // Middleware para manejar errores
// app.use(errorHandler);

// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const userRoutes = require('./routes/userRoutes');
const infoRoutes = require('./routes/infoRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const contactosRoutes = require('./routes/contactosRoutes');
const datapageRoutes = require('./routes/datapageRoutes');
const errorHandler = require('./middlewares/errorHandler');
const Comentarios = require('./models/comentarios'); // Asegúrate de importar correctamente el modelo de Comentarios
const Handlebars = require('handlebars');

const app = express();
app.use(bodyParser.json());

Handlebars.registerHelper('min', function(a, b) {
    return Math.min(a, b);
  });
  

Handlebars.registerHelper('range', function(start, end) {
    const result = [];
    const maxStars = 4; // Aseguramos que no haya más de 4 estrellas
    
    // Asegúrate de que start no sea mayor que maxStars
    start = Math.min(start, maxStars);
  
    // Limitar 'end' a un máximo de 4
    end = Math.min(end, maxStars);
  
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
  
    return result;
  });
  
  
  
// Configuración de Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Servir la página principal con comentarios
app.get('/', async (req, res) => {
    try {
        // Obtener los comentarios desde la base de datos
        const comentarios = await Comentarios.findAll({
            where: { isDelete: false }
        });

        // Renderizar la vista home con los comentarios
        res.render('home', { 
            title: 'Inance - Home', 
            comentarios: comentarios.map(c => c.toJSON()) // Asegúrate de convertir los comentarios a JSON
        });
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los comentarios' });
    }
});

// Ruta para la página About
app.get('/about', (req, res) => {
    res.render('about', { title: 'Inance - About' });
});

// Ruta para la página Services
app.get('/services', (req, res) => {
    res.render('services', { title: 'Inance - Services' });
});

// Ruta para la página Contact
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Inance - Contact' });
});

// Rutas API
app.use('/api', userRoutes);
app.use('/api', infoRoutes);
app.use('/api', comentariosRoutes);
app.use('/api', contactosRoutes);
app.use('/api', datapageRoutes);

// Middleware para manejar errores
app.use(errorHandler);

module.exports = app;


