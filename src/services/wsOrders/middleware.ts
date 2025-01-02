  import { Middleware, MiddlewareAPI } from "redux";
  
  interface WsActions {
    connect: string;
    disconnect: string;
    onOpen: () => any;
    onClose: () => any;
    onMessage: (data: any) => any;
    onError: (error: any) => any;
  }
  
  export const createWsMiddleware = (wsActions: WsActions): Middleware => {
    let socket: WebSocket | null = null;
  
    return (storeAPI: MiddlewareAPI) => (next) => (action: any) => {
      switch (action.type) {
        case wsActions.connect: {
          if (socket) {
            socket.close();
          }
  
          socket = new WebSocket(action.payload);
  
          socket.onopen = () => {
            storeAPI.dispatch(wsActions.onOpen());
          };
  
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            storeAPI.dispatch(wsActions.onMessage(data));
          };
  
          socket.onclose = () => {
            storeAPI.dispatch(wsActions.onClose());
          };
  
          socket.onerror = (error) => {
            storeAPI.dispatch(wsActions.onError("error"));
          };
  
          break;
        }
        case wsActions.disconnect: {
          if (socket) {
            socket.close();
            storeAPI.dispatch(wsActions.onClose());
          }
          break;
        }
        default:
          break;
      }
  
      return next(action);
    };
  };