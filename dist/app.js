"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireWildcard(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _expressMysqlSession = _interopRequireDefault(require("express-mysql-session"));

var _passport = _interopRequireDefault(require("passport"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _blog = _interopRequireDefault(require("./routes/blog.js"));

var _category = _interopRequireDefault(require("./routes/category.js"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _projects = _interopRequireDefault(require("./routes/projects.js"));

var _url = require("url");

require("./libs/passport.js");

var _multer = _interopRequireDefault(require("multer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _filename = (0, _url.fileURLToPath)(import.meta.url);

const _dirname = (0, _path.dirname)(_filename);

_dotenv.default.config(); // INIT


const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)()); // SETTINGS

app.set('views', _path.default.join(_dirname, 'views'));
app.engine('.hbs', (0, _expressHandlebars.default)({
  defaultLayout: 'main',
  layoutsDir: _path.default.join(app.get('views'), 'layouts'),
  partialsDir: _path.default.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs'); // MIDDLEWARES

app.use((0, _expressSession.default)({
  secret: process.env.SECRET_PASSPORT,
  resave: false,
  saveUninitialized: false,
  store: new _expressMysqlSession.default({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  })
}));
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.disable('etag');

const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _path.default.join(_dirname, 'public/img'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
});

app.use((0, _multer.default)({
  storage
}).single('image')); // GLOBAL VARIABLES

app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
}); // ROUTES

app.use('/blog', _blog.default);
app.use('/category', _category.default);
app.use('/user', _user.default);
app.use('/project', _projects.default);
app.get('/', (req, res) => {
  res.redirect('/user');
}); // PUBLIC

app.use(_express.default.static(_dirname.concat('/public')));