import { Middleware, MiddlewareAPI } from "redux";
import { connected, disconnected, messageReceived, errorReceived } from "./reducer";

export const webSocketMiddleware = (wsUrl: string): Middleware => {
    let socket: WebSocket | null = null;
  
    return (storeAPI: MiddlewareAPI) => (next) => (action: any) => {
      switch (action.type) {
        case 'ws/connect': {

          if (socket) {
            socket.close();
          }

          console.log(action.payload);
          socket = new WebSocket(action.payload || wsUrl);
  
          socket.onopen = () => {
            storeAPI.dispatch(connected());
          };
  
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            storeAPI.dispatch(messageReceived(data));
          };
  
          socket.onclose = () => {
            storeAPI.dispatch(disconnected());
          };
  
          socket.onerror = (error) => {
            storeAPI.dispatch(errorReceived('error'));
          };
  
          break;
        }
        case 'ws/disconnect': {
          if (socket) {
            socket.close();
            storeAPI.dispatch(disconnected());
          }
          break;
        }
        default:
          break;
      }
  
      return next(action);
    };
  };