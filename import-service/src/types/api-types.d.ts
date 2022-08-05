export type Response = {
  statusCode: number;
  headers?: { [key: string]: string };
  body: string;
};

export type ErrorResponse = {
  statusCode: number;
  headers?: { [key: string]: string };
  body: string;
};
