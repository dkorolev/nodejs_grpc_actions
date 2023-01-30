const grpc = require("@grpc/grpc-js");
const spec = grpc.loadPackageDefinition(require("@grpc/proto-loader").loadSync('../add.proto'));

const server = new grpc.Server();

server.addService(
  spec.test_add.RPC.service,
  {
    Add: (req, res) => {
      // `req.request.{a,b}` are of type `Long`, so `+` would just concatenate strings.
      res(null, { c: req.request.a.add(req.request.b) });
    }
  });

server.bindAsync(
  '0.0.0.0:5555',
  grpc.ServerCredentials.createInsecure(),
  () => { server.start(); }
);
