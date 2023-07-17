import { HttpStatusCode } from "./httpStatusCode.utils";

export interface ResponseApi<T = any> {
  data?:      T;
  statusCode: number;
}

export class HttpResponse<T = any> implements ResponseApi<T> {
  constructor(
    public data: T = null,
    public statusCode: number | HttpStatusCode = HttpStatusCode.OK,
  ) {}
}
