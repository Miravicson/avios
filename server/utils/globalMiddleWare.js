const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
const xss = require('xss-clean');

exports.setSecurityMiddleWare = (app) => {
  // Set security HTTP headers
  // const helmetConfig = {
  //   directives: {
  //     ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  //     'default-src': ["'self'"],
  //     'script-src': ["'self'"],
  //     'worker-src': ["'self'", 'blob:'],
  //   },
  // };

  // app.use(helmet({ contentSecurityPolicy: false }));

  // app.use(helmet.contentSecurityPolicy(helmetConfig));

  // Limit requests from same API
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  });
  app.use('/api', limiter);

  // Data sanitization against XSS
  // app.use(xss());
};
