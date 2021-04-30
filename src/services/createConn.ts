import WebSocket from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Observable } from 'rxjs/internal/Observable'

const createWebSocketConnection = <T>(url: string): Observable<T> => (
  webSocket({
    url,
    WebSocketCtor: WebSocket,
  })
)

export default createWebSocketConnection