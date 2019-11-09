const polka = require('polka');
const bodyParser = require('body-parser');
const cors = require('cors');

const getTodayData = require('./lib/getTodayData');
const getCollect = require('./lib/getCollect');
const parseVerseData = require('./lib/parseVerseData');
const version = require('./package').version;
const { versions, get: getVersion } = require('./utils/changelog');

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
      meta: Object.assign({}, meta, {
        devNotes: [
          '`meta` object within data was a bug and has been deprecated. Expect removal with v2.'
        ]
      }),
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
  .get('/festivals/:slug', async (req, res) => {
    const { slug } = req.params;
    await res.json({
      meta: { version },
      data: {
        attributes: {},
      },
    });
  })
  .get('/resources', (req, res) => {
    return res.json({
      meta: { version },
      data: [
        {
          id: 'apostles-creed',
          type: 'creed',
        },
        {
          id: 'nicene-creed',
          type: 'creed',
        },
      ],
    });
  })
  .get('/resources/:slug', () => {})
  .get('/versions', async (req, res) => {
    try {
      res.json({
        data: await versions(),
      });
    } catch (e) {
      res.json({
        errors: [e],
      });
    }
  })
  .get('/versions/:version', async (req, res) => {
    try {
      res.json({
        data: await getVersion(req.params.version),
      });
    } catch (e) {
      res.json({
        errors: [e],
      });
    }
  })
  .listen(PORT, () => console.log(`🙏 Daily Office API running on port ${PORT}`));
