const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Database initialization
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company TEXT,
    package_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Services/Packages table
  db.run(`CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL,
    features TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Portfolio table
  db.run(`CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    link TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Articles table
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    author TEXT,
    image_url TEXT,
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Contact messages table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('Database tables created/verified');
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/services', (req, res) => {
  db.all('SELECT * FROM packages', [], (err, rows) => {
    if (err) throw err;
    res.render('services', { packages: rows || [] });
  });
});

app.get('/portfolio', (req, res) => {
  db.all('SELECT * FROM portfolio', [], (err, rows) => {
    if (err) throw err;
    res.render('portfolio', { portfolio: rows || [] });
  });
});

app.get('/blog', (req, res) => {
  db.all('SELECT * FROM articles ORDER BY created_at DESC', [], (err, rows) => {
    if (err) throw err;
    res.render('blog', { articles: rows || [] });
  });
});

app.get('/blog/:id', (req, res) => {
  db.get('SELECT * FROM articles WHERE id = ?', [req.params.id], (err, row) => {
    if (err) throw err;
    if (!row) return res.status(404).render('404');
    res.render('blog-detail', { article: row });
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  db.run(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'خطا در ارسال پیام' });
      }
      res.json({ success: true, message: 'پیام شما با موفقیت ارسال شد' });
    }
  );
});

app.get('/register', (req, res) => {
  db.all('SELECT * FROM packages', [], (err, rows) => {
    if (err) throw err;
    res.render('register', { packages: rows || [] });
  });
});

app.post('/api/register', (req, res) => {
  const { name, email, phone, company, package_id } = req.body;
  db.run(
    'INSERT INTO users (name, email, phone, company, package_id) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, company, package_id],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ success: false, message: 'این ایمیل قبلاً ثبت شده است' });
        }
        return res.status(500).json({ success: false, message: 'خطا در ثبت‌نام' });
      }
      
      // Get package info for pricing
      db.get('SELECT * FROM packages WHERE id = ?', [package_id], (err, pkg) => {
        res.json({ 
          success: true, 
          message: 'ثبت‌نام موفق',
          userId: this.lastID,
          package: pkg
        });
      });
    }
  );
});

app.get('/pricing/:packageId', (req, res) => {
  db.get('SELECT * FROM packages WHERE id = ?', [req.params.packageId], (err, row) => {
    if (err) throw err;
    if (!row) return res.status(404).render('404');
    res.render('pricing', { package: row });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
