const express = require('express');
const bodyParser = require('body-parser');
const ejs = require ('ejs');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'mydb',
  });
  //

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida.');
});

//
app.use(
  session({
  secret: 'aluno',
  resave: true,
  saveUninitialized: true,
  })
  );
  //


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home'); // Renderiza a tela de inicio
 
});

app.get('/contato', (req, res) => {
  res.render('contato.ejs'); // Renderiza a tela de inicio
 
});

app.get('/sobre', (req, res) => {
  res.render('sobre.ejs'); // Renderiza a tela de inicio
 
});

app.get('/postagens', (req, res) => {
  res.render('postagens.ejs'); // Renderiza a tela de inicio
 
});

app.get('/login', (req, res) => {
  res.render('login.ejs'); // Renderiza a tela de inicio
 
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro.ejs'); // Renderiza a tela de inicio
 
});

//
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, results) => {
  if (err) throw err;
  if (results.length > 0) {
    req.session.loggedin = true;
    req.session.username = username;
    res.redirect('/contato');
 
 } });
  });

  app.post('/postagens', (req, res) => {
    // Verifica se o usuário está logado
    if (!req.session.loggedin) {
      return res.redirect('/login'); // Redireciona para a página de login se não estiver logado
    }
  
    const { name } = req.body; // Obtém os dados da postagem do corpo da solicitação
  
    // Insere a postagem no banco de dados
    const sql = 'INSERT INTO postg (name, user_id) VALUES (?, ?)';
    db.query(sql, [name, req.session.user_id], (err, result) => {
      if (err) {
        console.error('Erro ao inserir postagem:', err);
        return res.redirect('/'); // Redireciona de volta para a página inicial em caso de erro
      }
      res.redirect('/'); // Redireciona de volta para a página inicial após a inserção bem-sucedida
    });
  });
  
  // Rota para a página do painel
  app.get('/dash', (req, res) => {
    res.render('dash'); // Renderiza a tela de inicio
  
  //
  //
  //
  //modificação aqui
  if (req.session.loggedin) {
  //res.send(`Bem-vindo, ${req.session.username}!<br><a href="/logout">Sair</a>`);
  res.sendFile(__dirname + '/views/dash.ejs');
  } else {
  res.send('Faça login para acessar esta página. <a href="/">Login</a>');
  }
  });
  
  // Rota para fazer logout
  app.get('/logout', (req, res) => {
  req.session.destroy(() => {
  res.redirect('/');
  });
  });

 

   

app.post('/cadastro', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.redirect('/cadastro'); // Redireciona de volta ao formulário de cadastro em caso de erro
    } else {
      // Cadastro bem-sucedido; você pode redirecionar para a página de login ou outra página.
      res.redirect('/login');
    }
  });
});

// DELETE
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/teste');
  });
});

    // Rota para a página do painel
app.get('/dash', (req, res) => {



  //
  //
  //
  //modificação aqui
  if (req.session.loggedin) {
  //res.send(`Bem-vindo, ${req.session.username}!<br><a href="/logout">Sair</a>`);
  res.sendFile(__dirname + '/views/dash.html');
  } else {
  res.send('Faça login para acessar esta página. <a href="/">Login</a>');
  }
  });
  
  // Rota para fazer logout
  app.get('/logout', (req, res) => {
  req.session.destroy(() => {
  res.redirect('/');
  });
  });
  
    
      


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});


