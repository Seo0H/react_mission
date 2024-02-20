/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const cors = require('cors');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(
  jsonServer.rewriter({
    '/api/question/:typeId': '/question/:typeId',
  }),
);

const corsOptions = {
  origin: 'http://localhost:3300',
  credentials: true,
};

server.use(cors(corsOptions));
server.use(jsonServer.bodyParser);

server.post('/api/answer/common', (req, res, next) => {
  const body = req.body;
  console.log('🚀 ~ server.post ~ body:', body);
  res.header();
  if (req.method === 'POST') {
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
  } else {
    next();
  }
});

server.post('/api/answer/:typeId', (req, res, next) => {
  const body = req.body;
  if (req.method === 'POST') {
    return res
      .json({
        status: 200,
        data: {
          isSuccess: true,
        },
      })
      .status(200);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
