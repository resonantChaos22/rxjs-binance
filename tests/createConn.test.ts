import { createWebSocketConnection } from '../src/services';
import { WSResponse } from '../src/interfaces';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

test('should connect', async () => {
  const url: string = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  
    let res: Observable<WSResponse> = createWebSocketConnection<WSResponse>(url)
    .pipe(take(1))
    res.forEach(v => expect(v.e).toBe("trade"))
});
