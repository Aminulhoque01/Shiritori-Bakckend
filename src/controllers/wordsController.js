const axios = require('axios');

exports.validateWord = async (req, res) => {
  const { word } = req.query;
  if (!word) return res.status(400).json({ ok: false, error: 'word is required' });

  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
    const response = await axios.get(url);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return res.json({ ok: true, word, data: response.data[0] });
    }
    res.status(404).json({ ok: false, error: 'not found' });
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ ok: false, error: 'not found' });
    }
    res.status(500).json({ ok: false, error: 'server error' });
  }
};
