import { createWebSocketConnection, handleData } from './services';
import { WSResponse } from './interfaces';

import { retryWhen, tap, delay } from 'rxjs/operators';

const url: string = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
export function main(url: string) {
  
  let errCheck: number = 0;
  createWebSocketConnection<WSResponse>(url)
    .pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((err) => {
            errCheck++
            console.error(`Got error: ${err.message} \nRetrying...${errCheck}`);
            if (errCheck == 5) {
              console.error(err)
              process.exit()
            }
          }),
          delay(5000)
        )
      )
    )
    .subscribe((v) => {
      handleData(v);
    });
}

main(url)

