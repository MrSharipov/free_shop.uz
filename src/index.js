const express = require('express');
const bodyParser = require('body-parser');
const v1UserRouter = require('./v1/routes/user.router');
const v1ProductsRouter = require('./v1/routes/product.router');
const v1CartsRouter = require('./v1/routes/carts.router');
const v1OrdersRouter = require('./v1/routes/orders.router');
const dbConnect = require('./v1/database/db.connections');

const app = express();

//Adding routes
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/products', v1ProductsRouter);
app.use('/api/v1/carts', v1CartsRouter);
app.use('/api/v1/orders', v1OrdersRouter);

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

dbConnect();

app.get('/', (req, res) => {
	res.send("<h2>It's Working!</h2>");
});

app.post('/', (req, res) => {
	res.send(req.body);
});

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
});
