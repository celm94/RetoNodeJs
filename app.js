const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const contactos = []; // Declara el arreglo para almacenar los contactos

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', upload.single('archivoAdjunto'), (req, res) => {
  const { nombre, email } = req.body;
  const archivoAdjunto = req.file;

  const contacto = {
    nombre,
    email,
    archivoAdjunto: archivoAdjunto ? archivoAdjunto.originalname : null,
  };

  contactos.push(contacto); // Agregar el contacto al arreglo de contactos

  res.redirect('/contactos');
});

app.get('/contactos', (req, res) => {
  res.sendFile(__dirname + '/public/contactos.html');
});

app.get('/contactos-api', (req, res) => {
  res.json(contactos); // Devolver el arreglo de contactos en formato JSON
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
