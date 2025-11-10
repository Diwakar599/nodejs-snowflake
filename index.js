require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectOnce } = require('./src/snowflake');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ✅ Serve static files
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src', 'view')));

// ✅ Connect to Snowflake
(async () => {
    try {
        await connectOnce();
        console.log('✅ Connected to Snowflake successfully!');
    } catch (err) {
        console.error('❌ Snowflake connection failed:', err.message);
        process.exit(1);
    }
})();

// ✅ Main and page routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'mainpage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'signup.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'dashboard.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'products.html'));
});



app.get('/userdashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'userdashboard.html'));
});




app.use('/', userRoutes);
app.use('/', productRoutes); // <-- mount here

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
