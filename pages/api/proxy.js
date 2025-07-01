export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
        'Referer': url, // 某些來源需要 Referer
      },
    });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');

    // pipe 回傳的 stream 給前端
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Proxy Error: ' + err.message);
  }
}
