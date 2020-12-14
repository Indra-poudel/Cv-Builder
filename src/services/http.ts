import { RecovoHttp } from './axios-instance';

export enum RequestMethod {
  POST,
  GET,
  DELETE,
  PUT,
}

interface IHttpInfo {
  requestMethod: RequestMethod;
  url: string;
  requestBody?: object;
}

const request = (info: IHttpInfo): Promise<typeof RecovoHttp> => {
  switch (info.requestMethod) {
    case RequestMethod.POST:
      return RecovoHttp.post(info.url, info.requestBody);
    case RequestMethod.PUT:
      return RecovoHttp.put(info.url, info.requestBody);
    case RequestMethod.DELETE:
      return RecovoHttp.delete(info.url);
    case RequestMethod.GET:
      return RecovoHttp.get(info.url);
    default:
      return Promise.reject('Method not found');
  }
};

export default { request };
