var express = require('express');
var router = express.Router();

function getDeepTypes (o) {
  var types = {}
  for (var key in o) {
    types[key] = typeof o[key]

    if (Array.isArray(o[key])) {
      types[key] = 'array'
    } else if (o[key] instanceof Function) {
      types[key] = 'function'
    } else if (types[key] === 'object') {
      types[key] = getDeepTypes(o[key])
    }
  }

  return types
}

/* GET home page. */
router.all('/', function(req, res, next) {
  let types = getDeepTypes(req.body)
  res.json({
    status: 200,
    headers: req.headers,
    'content-type': req.get('content-type') ? req.get('content-type') : null,
    params: req.params,
    body: req.body,
    types: types,
    method: req.method,
    xhr: req.xhr
  })
});

router.get('/ajax', function (req, res, next) {
  res.render('ajax')
})

module.exports = router;
