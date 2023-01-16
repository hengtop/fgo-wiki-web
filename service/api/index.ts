import httpRequest from '..';

import { jsonObject, promiseFormatter } from '@/utils';

type IServentListItem = Record<string, string>;

export const getServentList = (params: any) => {
  return promiseFormatter(
    httpRequest.request<{
      d: {
        list: IServentListItem[];
      };
    }>({
      url: '/topic/codex',
      method: 'POST',
      showLoading: false,
      showResponseMessage: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        json: jsonObject({
          action: 'list',
          cat: '78',
          ...params,
        }),
      },
    })
  );
};

export const getServentDetail = (params: any) => {
  return promiseFormatter(
    httpRequest.request<{
      d: {
        list: any[];
      };
    }>({
      url: '/topic/codex',
      method: 'POST',
      showLoading: false,
      showResponseMessage: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        json: jsonObject({ action: 'detail', ...params }),
      },
    })
  );
};

export const getServentSuit = (params: { val: string }) => {
  return promiseFormatter(
    httpRequest.request<{
      d: {
        list: any[];
      };
    }>({
      url: '/topic/codex',
      method: 'POST',
      showLoading: false,
      showResponseMessage: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        json: jsonObject({
          field: 'EQUIPID',
          action: 'detail',
          cat: '79',
          ...params,
        }),
      },
    })
  );
};
