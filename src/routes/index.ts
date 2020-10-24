import { Router } from 'express';
import session from 'express-session';
import { ExpressOIDC } from '@okta/oidc-middleware';

import adminRouter from './admin.routes';
import postsRouter from './posts.routes';

const routes = Router();

routes.use(
  session({
    secret: process.env.RANDOM_SECRET_WORD as string,
    resave: true,
    saveUninitialized: false,
  }),
);

const oidc = new ExpressOIDC({
  appBaseUrl: 'http://localhost:3333',
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URL,
  logoutRedirectUri: '/',
  scope: 'openid profile',
  routes: {
    callback: {
      path: '/callback',
      defaultRedirect: '/admin',
    },
  },
});

routes.use(oidc.router);

routes.use('/admin', oidc.ensureAuthenticated(), adminRouter);
routes.use('/posts', postsRouter);

export default routes;
