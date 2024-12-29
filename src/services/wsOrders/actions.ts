// export const wsActions = {
//     connect: "wsOrderAll/WS_ORDERS_ALL_CONNECT",
//     disconnect: "wsOrderAll/WS_ORDERS_ALL_DISCONNECT",
//     onOpen: () => ({ type: "wsOrderAll/WS_ORDERS_ALL_CONNECTED" }),
//     onClose: () => ({ type: "wsOrderAll/WS_ORDERS_ALL_DISCONNECTED" }),
//     onMessage: (data: any) => ({ type: "wsOrderAll/WS_ORDERS_ALL_MESSAGE_RECEIVED", payload: data }),
//     onError: (error: any) => ({ type: "wsOrderAll/WS_ORDERS_ALL_ERROR", payload: error }),
//   };
  

  export const createWsActions = (prefix: string) => ({
    connect: `${prefix}/CONNECT`,
    disconnect: `${prefix}/DISCONNECT`,
    onOpen: () => ({ type: `${prefix}/CONNECTED` }),
    onClose: () => ({ type: `${prefix}/DISCONNECTED` }),
    onMessage: (data: any) => ({ type: `${prefix}/MESSAGE_RECEIVED`, payload: data }),
    onError: (error: any) => ({ type: `${prefix}/ERROR`, payload: error }),
  });