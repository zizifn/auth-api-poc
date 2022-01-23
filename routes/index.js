import { Router } from 'express';
import { openTelCounterHTTP } from '../utils/opnetel-metric.js'
var router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.rawHeaders);
  if (res.statusCode === 200) {
    const attributes = { api: 'index' };
    openTelCounterHTTP.add(10, attributes);
  }
  res.render('index', { title: 'Express' });
});

export default router;
