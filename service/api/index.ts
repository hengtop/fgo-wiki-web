import httpRequest from '..';

import { jsonObject, promiseFormatter } from '@/utils';

type IServentListItem = Record<string, string>;

interface IRequestOption {
  /**
   * 是否开启代理
   */
  proxy: boolean;
}

// 公共部分
function nativeRequest<T, R>(params: T, option?: IRequestOption) {
  return promiseFormatter(
    httpRequest.request<R>({
      url: `${option?.proxy ? 'http://localhost:3000/api' : ''}/topic/codex`,
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

/**
 * 获取从者列表
 */
export const getServentList = (params: any, option?: IRequestOption) => {
  return nativeRequest<
    any,
    {
      d: {
        list: IServentListItem[];
      };
    }
  >(
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
export const getServentDetail = (params: any, option?: IRequestOption) => {
  return nativeRequest<
    any,
    {
      d: {
        list: any[];
      };
    }
  >(
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
  params: { val: string },
  option?: IRequestOption
) => {
  return nativeRequest<
    any,
    {
      d: {
        list: any[];
      };
    }
  >(
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
    httpRequest.request({
      url: 'http://localhost:3000/active',
      method: 'GET',
    })
  );
};
