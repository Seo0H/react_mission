/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const cors = require('cors');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);

const corsOptions = {
  origin: 'http://localhost:3300',
  credentials: true,
};

server.use(cors(corsOptions));
server.use(jsonServer.bodyParser);

server.post('/answer', (req, res, next) => {
  const body = req.body;
  const { id } = req.query;

  console.log('🚀 ~ server.post ~ body:', body);

  if (id === 'common') {
    return res
      .json({
        status: 200,
        data: {
          isSuccess: true,
          nextTypeId: '1',
          userId: 'A12QTB',
        },
      })
      .status(200);
  }

  return res
    .json({
      status: 200,
      data: {
        isSuccess: true,
      },
    })
    .status(200);
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
