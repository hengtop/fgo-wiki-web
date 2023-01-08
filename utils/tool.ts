import { MD5Encrypt } from './md5';
const initParams = {
  p: 'android',
  v: '1.0.0',
  g: '11',
  u: '159c1ae3d73242797144dfe1a2ef9399',
  ip: '',
  d: { cat: '78' },
};

// 对参数进行md5加密
export function jsonObject(params) {
  const requestParams = {
    ...initParams,
    d: {
      ...initParams.d,
      ...params,
    },
  };
  return {
    ...requestParams,
    t: MD5Encrypt(JSON.stringify(requestParams) + '123456'),
  };
}

type IObject<T = any> = Record<any, T>;
type IPromiseWrapper<T> = Promise<
  [(Error & IObject) | undefined, T | undefined]
>;
export function promiseFormatter<T>(promise: Promise<T>): IPromiseWrapper<T> {
  return promise
    .then((res) => [void 0, res])
    .catch((err: Error) => [err, void 0]) as any;
}
