const Long = require('long');
const grpc = require("@grpc/grpc-js");
const spec = grpc.loadPackageDefinition(require("@grpc/proto-loader").loadSync(__dirname + '/../add.proto'));

const client = new spec.test_add.RPC('0.0.0.0:5555', grpc.credentials.createInsecure());

const main = async () =>  {
  let total = 0;
  let fail = false;
  for (let a = 1; a <= 10; ++a) {
    for (let b = 1; b <= 10; ++b) {
      await new Promise(done => {
        client.Add({ a, b }, (_, res) => {
          ++total;
          if (res.c !== (a + b)) {
            fail = true;
          }
          done();
        });
      });
    }
  }
  console.log(`Total: ${total}.`);
  console.log(`Test ${fail ? 'failed' : 'passed'}.`);
  await new Promise(done => client.Kill({}, done));
};

main();
