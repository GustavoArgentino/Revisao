const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const db = mysql.createConnection({const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'mydb',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida.');
});

app.use(
  session({
    secret: 'aluno',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/contato', (req, res) => {
  res.render('contato');
});

app.get('/sobre', (req, res) => {
  res.render('sobre');
});

app.get('/postagem', (req, res) => {
  const Postagens = [
    { _id: 1, mensagens: "Mensagem 1" },
    { _id: 2, mensagens: "Mensagem 2" }
  ];
  res.render('postagem', { Postagens: Postagens });
});

// DELETE
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM postg WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/teste');
  });
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/postagem');
    }
  });
});

app.post('/submit_post', (req, res) => {
  const { mensagens } = req.body;
  const sql = 'INSERT INTO Postagens (mensagens) VALUES (?)';
  db.query(sql, [mensagens], (err, result) => {
    if (err) throw err;
    res.redirect('/teste');
  });
});

app.get('/teste', (req, res) => {
  db.query('SELECT * FROM Postagens', (err, result) => {
    if (err) throw err;
    res.render('postagem', { Postagens: result });
  });
});

app.post('/cadastro', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.redirect('/cadastro');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/delete2/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Postagens WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/postagem');
  });
});

app.get('/dash', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, '/views/dash.ejs'));
  } else {
    res.send('Faça login para acessar esta página. <a href="/">Login</a>');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'mydb',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida.');
});

app.use(
  session({
    secret: 'aluno',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/contato', (req, res) => {
  res.render('contato');
});

app.get('/sobre', (req, res) => {
  res.render('sobre');
});

app.get('/postagem', (req, res) => {
  const Postagens = [
    { _id: 1, mensagens: "Mensagem 1" },
    { _id: 2, mensagens: "Mensagem 2" }
  ];
  res.render('postagem', { Postagens: Postagens });
});

// DELETE
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM postg WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/teste');
  });
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/postagem');
    }
  });
});

app.post('/submit_post', (req, res) => {
  const { mensagens } = req.body;
  const sql = 'INSERT INTO Postagens (mensagens) VALUES (?)';
  db.query(sql, [mensagens], (err, result) => {
    if (err) throw err;
    res.redirect('/teste');
  });
});

app.get('/teste', (req, res) => {
  db.query('SELECT * FROM Postagens', (err, result) => {
    if (err) throw err;
    res.render('postagem', { Postagens: result });
  });
});

app.post('/cadastro', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.redirect('/cadastro');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/delete2/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Postagens WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/postagem');
  });
});

app.get('/dash', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, '/views/dash.ejs'));
  } else {
    res.send('Faça login para acessar esta página. <a href="/">Login</a>');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
