declare module 'http' {
  interface IncomingMessage {
    user: {
      id: number;
      username: string | undefined;
      firstName: string | undefined;
      lastName: string | undefined;
    };
  }
}
