const redirects = [
  {
    from: '/playson-may-cashdays',
    to: '/tournaments/playson-may-cashdays',
  },
  {
    from: '/drops-wins',
    to: '/tournaments/drops-wins',
  },
];

export default function(req, res, next) {
  const redirect = redirects.find(r => r.from === req.url);

  if (redirect) {
    res.writeHead(301, { Location: redirect.to });
    res.end();
  } else {
    next();
  }
}
