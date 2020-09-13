const winston = require('winston');
const config = require('config');
const {Loggly} = require('winston-loggly-bulk');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, {message: info.stack});
  }
  return info;
});

const transports = [
  new winston.transports.Console({
    stderrLevels: ['error'],
  }),
];

const nodeEnv = process.env.NODE_ENV || config.get('NODE_ENV');

if (
  nodeEnv === 'production' &&
  config.has('LOGGLY_TOKEN') &&
  config.has('LOGGLY_SUBDOMAIN')
) {
  try {
    const loggly = new Loggly({
      token: config.get('LOGGLY_TOKEN'),
      subdomain: config.get('LOGGLY_SUBDOMAIN'),
      tags: ['Winston-NodeJS'],
      json: true,
    });

    transports.push(loggly);
  } catch (err) {}
}

const logger = winston.createLogger({
  level: nodeEnv === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    nodeEnv === 'development' ?
      winston.format.colorize() :
      winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({level, message}) => `${level}: ${message}`),
  ),
  transports: transports,
});

module.exports = logger;
