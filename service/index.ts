import { HttpRequest } from 'heng-request';

const httpRequest = new HttpRequest({
  baseURL: 'http://fgo-service.vgtime.com',
  timeout: 5000,
  cancleRequests: [],
  handleCallback: {
    loadingStart: (config) => {},
    loadingEnd: () => {},
    responseErr: (err: any) => {},
  },
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      // 关闭表格加载动画
      return res;
    },
    responseInterceptorCatch(err) {
      return Promise.reject(err);
    },
  },
});

const proxyHttpRequest = new HttpRequest({
  baseURL: '/',
  timeout: 5000,
  cancleRequests: [],
  handleCallback: {
    loadingStart: (config) => {},
    loadingEnd: () => {},
    responseErr: (err: any) => {},
  },
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      // 关闭表格加载动画
      return res;
    },
    responseInterceptorCatch(err) {
      return Promise.reject(err);
    },
  },
});

export { proxyHttpRequest };

export default httpRequest;
