var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
