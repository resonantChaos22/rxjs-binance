import { main } from '../src/main';
test('should work', async (done) => {
  const url: string = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  main(url);
  done();
});

test('should not work', async (done) => {
  const url: string = 'wss://stream.binance.com:9443/s/btcusdt@trade';
  await main(url);
  done();
});
