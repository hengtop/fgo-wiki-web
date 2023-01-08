import MD5 from 'MD5';

export function MD5Encrypt(params: string) {
  return MD5(params);
}
