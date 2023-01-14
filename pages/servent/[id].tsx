import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

import styles from './index.module.scss';

import { getServentDetail, getServentList } from '@/service/api';

export default function Index({ detail }: { detail: any }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{detail?.name}</title>
      </Head>
      <Image alt="icon" width={512} height={724} src={detail?.pic1} />
      <div>{detail?.name}</div>
    </div>
  );
}

export async function getStaticPaths() {
  // 获取所有从者id
  const [, res] = await getServentList({
    pn: '1',
    action: 'list',
    ps: '72',
  });
  const listId = res?.d?.list?.map((item) => ({ params: { id: item.id } }));
  return {
    paths: listId,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const {
    params: { id },
  } = context;
  const [, res] = await getServentDetail({ id });
  const {
    d: { data: detail },
  } = res as any;
  return {
    // Passed to the page component as props
    props: { detail },
  };
}
