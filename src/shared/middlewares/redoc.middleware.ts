import redoc from 'redoc-express';

export function setupRedoc(app: any) {
  const redocOptions = {
    title: 'Pettech Stock API',
    specUrl: '/api-json',
  };

  app.use('/docs', redoc.default(redocOptions));
}
