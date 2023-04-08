// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpRequest } from 'heng-request';
const http = new HttpRequest({ timeout: 5000 });

type Data = {
  name: string;
};

interface ProxyHandlerNextApiRequest extends NextApiRequest {
  query: Partial<{
    [key: string]: string | undefined;
  }>;
}

// 代理转发
export default function proxyHandler(
  req: ProxyHandlerNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query) {
    const { url, json } = req.query;
    if (req.query)
      http
        .request<any>({
          url,
          method: req.method,
          params: {
            json,
          },
        })
        .then((rawRes) => {
          res.status(200).json(rawRes);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
  }
}
