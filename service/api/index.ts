import type {
  IGetServentDetailRequestType,
  IGetServentDetailResponseType,
  IGetServentListResponseType,
  IGetServentListRequestType,
  IGetServentSuitResponseType,
  IGetServentSuitRequestType,
} from '../types';

import httpRequest, { proxyHttpRequest } from '..';

import { jsonObject, promiseFormatter } from '@/utils';

interface IRequestOption {
  /**
   * 是否开启代理
   */
  devProxy?: boolean;
  prodProxy?: boolean;
}

// 公共部分
function nativeRequest<T, R>(params: T, option?: IRequestOption) {
  return promiseFormatter(
    httpRequest.request<R>({
      // dev proxy
      url: `${option?.devProxy ? 'http://localhost:3000/api' : ''}/topic/codex`,
      method: 'POST',
      showLoading: false,
      showResponseMessage: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params,
    })
  );
}

// prod cors proxy
function corsProxyNativeRequest<T, R>(params: T, option?: IRequestOption) {
  return promiseFormatter(
    proxyHttpRequest.request<R>({
      url: '/api/proxy',
      method: 'POST',
      showLoading: false,
      showResponseMessage: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        ...params,
        url: 'http://fgo-service.vgtime.com/topic/codex',
      },
    })
  );
}

function checkProxy<T, R>(params: T, option?: IRequestOption) {
  if (option?.devProxy && option?.prodProxy) {
    throw new Error("The 'devproxy' and 'prodProxy' properties cannot coexist");
  }
  if (option?.prodProxy) {
    return corsProxyNativeRequest<T, R>(params, option);
  } else {
    return nativeRequest<T, R>(params, option);
  }
}

/**
 * 获取从者列表
 */
export const getServentList = (
  params: IGetServentListRequestType,
  option?: IRequestOption
) => {
  return checkProxy<any, IGetServentListResponseType>(
    {
      json: jsonObject({
        action: 'list',
        cat: '78',
        ...params,
      }),
    },
    option
  );
};

/**
 * 获取从者详情
 */
export const getServentDetail = (
  params: IGetServentDetailRequestType,
  option?: IRequestOption
) => {
  return checkProxy<any, IGetServentDetailResponseType>(
    {
      json: jsonObject({ action: 'detail', ...params }),
    },
    option
  );
};

/**
 * 获取礼装详情
 */
export const getServentSuit = (
  params: IGetServentSuitRequestType,
  option?: IRequestOption
) => {
  return checkProxy<any, IGetServentSuitResponseType>(
    {
      json: jsonObject({
        field: 'EQUIPID',
        action: 'detail',
        cat: '79',
        ...params,
      }),
    },
    option
  );
};

// 获取活动信息
export const getActiveInfo = () => {
  return promiseFormatter(
    httpRequest.request<string>({
      url: 'https://fgo.wiki/w/%E9%A6%96%E9%A1%B5',
      method: 'GET',
    })
  );
};
