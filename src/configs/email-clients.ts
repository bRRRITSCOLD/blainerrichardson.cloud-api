import { env } from '../lib/environment';

export default [
  {
    name: env.EMAIL_CLIENT_GMAIL_NAME,
    service: 'gmail',
    auth: {
      user: env.EMAIL_CLIENT_GMAIL_USERNAME,
      pass: env.EMAIL_CLIENT_GMAIL_PASSWORD,
    },
  },
];
