  export const createWsActions = (prefix: string) => ({
    connect: `${prefix}/CONNECT`,
    disconnect: `${prefix}/DISCONNECT`,
    onOpen: () => ({ type: `${prefix}/CONNECTED` }),
    onClose: () => ({ type: `${prefix}/DISCONNECTED` }),
    onMessage: (data: any) => ({ type: `${prefix}/MESSAGE_RECEIVED`, payload: data }),
    onError: (error: any) => ({ type: `${prefix}/ERROR`, payload: error }),
  });