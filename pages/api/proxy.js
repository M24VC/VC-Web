export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
        'Referer': url
      }
    });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!response.body) return res.status(500).send('No body in response');
    response.body.pipe(res);
  } catch (e) {
    res.status(500).send('Proxy Error: ' + e.message);
  }
}
