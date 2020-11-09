require('dotenv').config();
require('./lib/client').connect();

const app = require('./lib/app');
const request = require('superagent');
const { mungeLocation }
 = require('./utils.js');
const PORT = process.env.PORT || 7890;

app.get('/', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.location}&format=json`;

    const response = await request.get(URL);

    const newResponse = mungeLocation(response.body);

    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
