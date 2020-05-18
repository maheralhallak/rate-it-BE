var express = require('express');
var app = express();
//express is ready...!!!

const connectDb = require('./config/db')

require('dotenv').config()
//.env file connected 
connectDb()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var commentRouter = require('./routes/comment')
//CORS SETUP-----------------------
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
    next();
}
app.use(allowCrossDomain);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Rate-it app started Working on port ${PORT}`)
);

app.get('/', function (req,res) {
  res.cookie('my first cookie', 'looks great!!');
  res.end('that was nice the end ')
})
app.get('/remove', function (req,res) {
  res.clearCookie('my first cookie');
    
})





/* await ( await fetch(
    'https://www3.wipo.int/branddb/jsp/select.jsp',
    {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: {
        q:                         'BRAND:sushi',
        fl:                        'BRAND,SOURCE,STATUS,score,OO,HOL,ID,AD,VCS,USC,NC,IMG,ID',
        hl:                        true,
        'hl.requireFieldMatch':    'true',
        'hl.fragsize':             '5000',
        type:                      'brand',
        facet:                     'true',
        qi:                        '2285-1422386635681',
        'json.nl':                 'map',
        wt:                        'json',
        sort:                      'score desc,AD desc',
        rows:                      '30',
        start:                     '0',
        'f.SOURCE.facet.limit':    '50',
        'f.SOURCE.facet.mincount': '1',
        'f.STATUS.facet.limit':    '20',
        'f.STATUS.facet.mincount': '1',
        'f.OO.facet.mincount':     '1',
        'facet.field':             ['SOURCE','STATUS','OO'],
        'facet.query':             ['ITY:VERBAL','ITY:NONVERBAL','ITY:COMBINED','ITY:UNKNOWN','ED:[* TO NOW/DAY]','ED:[NOW/DAY-1MONTH TO NOW/DAY]','ED:[NOW/DAY+1DAY TO *]','ED:[NOW/DAY+1DAY TO NOW/DAY+1MONTH]','ED:[NOW/DAY+1DAY TO NOW/DAY+6MONTHS]','ED:[NOW/DAY+1DAY TO NOW/DAY+1YEAR]']
      }
    }
  ) ).json()  */

  
module.exports = app;
