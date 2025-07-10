const express = require('express');
const app = express();
const db = require('./database');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mostrar todos los usuarios
app.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    res.render('index', { users: rows });
  });
});

// Agregar usuario
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users(name, email) VALUES(?, ?)', [name, email], () => {
    res.redirect('/');
  });
});

// Eliminar usuario
app.post('/delete/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], () => {
    res.redirect('/');
  });
});

// Editar usuario
app.post('/edit/:id', (req, res) => {
  const { name, email } = req.body;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], () => {
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
