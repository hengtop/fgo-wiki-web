import httpRequest from '..';

import { jsonObject, promiseFormatter } from '@/utils';

export const getServentList = (params) => {
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
        json: jsonObject(params),
      },
    })
  );
};
