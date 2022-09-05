// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// const path = require('path');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({ helpers });
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    // will check every 10 minutes
    checkExpirationInterval: 1000 * 60 * 10,
    // will expire after 30 minutes
    expiration: 1000 * 60 * 30
  })
};

// app.use(session(sess));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// // turn on routes
// app.use(routes);

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

// app.use(session(sess));
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.use(session(sess));

// middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});

