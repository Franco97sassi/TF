const server = require('./src/app.js');
const {User, conn } = require('./src/db.js');
const {PORT} = process.env

const createAdmin = async ()=>{
  const adminUser = await User.findOne({ where: { admin: true } });
   if (!adminUser) {
    // No se encontró un usuario admin, crear uno nuevo
   await User.create({
      username: 'Administrador',
      email: 'admin@todofloral.com',
      password: "$2b$10$s6lMYCUn2D0KbVIHfo6i7ugERiAjAq497jpwP4utBhKuKN4ae/oY.",//'admTF23TechX-', 
      admin: true,
    });
    console.log('Usuario admin creado con éxito.');
  } else {
    console.log('Ya existe un usuario admin.');
  }
}
// import dietTypes from './src/utils/apispoon'

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {

  createAdmin()

  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
 
  });
});