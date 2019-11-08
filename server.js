const polka = require('polka');
const bodyParser = require('body-parser');
const cors = require('cors');

const getTodayData = require('./lib/getTodayData');
const getCollect = require('./lib/getCollect');
const parseVerseData = require('./lib/parseVerseData');
const version = require('./package').version;

const PORT = process.env.PORT || 8080;

const json = (req, res, next) => {
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(data));
  };

  next();
};

// TODO: Create an API key for analytics

polka()
  .use(cors(), bodyParser.json(), json)
  .get('/days/:date', async (req, res) => {
    const { meta: todayMeta, attributes } = await getTodayData(req.params.date, req.query);
    const content = parseVerseData(attributes);
    const [morning, evening] = await Promise.all([
      getCollect(req.params.date, 'morning'),
      getCollect(req.params.date, 'evening'),
    ]);

    const meta = Object.assign({}, todayMeta, {
      version,
    });

    await res.json({
      data: {
        meta,
        attributes: Object.assign({}, {
          offices: content,
          collects: {
            morning,
            evening,
          },
        }),
      },
    });
  })
  .get('/festivals/:slug', (req, res) => {

  })
  .listen(PORT, () => console.log(`🙏 Daily Office API running on port ${PORT}`));
