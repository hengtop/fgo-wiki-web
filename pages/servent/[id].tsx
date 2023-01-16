import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Head from 'next/head';

import styles from './index.module.scss';

import Arts from '@/public/static/Arts.png';
import Buster from '@/public/static/Buster.png';
import Quick from '@/public/static/Quick.png';

import {
  getServentDetail,
  getServentList,
  getServentSuit,
} from '@/service/api';

function calcCardTypeNumber(
  typeNumber: string | number,
  imageSrc: StaticImageData
) {
  return new Array(+typeNumber)
    .fill(0)
    .map((item: number | string, index: number) => {
      return (
        <Image alt="" src={imageSrc} key={index + String(imageSrc) + ''} />
      );
    });
}

export default function Index({
  detail,
  suitList,
}: {
  detail: any;
  suitList: any;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{detail?.name}</title>
      </Head>
      <div className={styles['main-info']}>
        <h2 className={styles['main-title']}>{detail?.name}</h2>
        <div className={styles['top-info']}>
          <Image alt="" src={detail?.pic1} width={318.23} height={450} />
          <div className={styles['base-info']}>
            <table border={1} width="100%" align="center">
              <tbody>
                <tr>
                  <th colSpan={5}>{detail?.name}</th>
                </tr>
                <tr>
                  <td colSpan={5}>{detail?.disp_name}</td>
                </tr>
                <tr>
                  <td colSpan={5}>{detail?.name_jp}</td>
                </tr>
                <tr>
                  <td colSpan={5}>{detail?.name_en}</td>
                </tr>
                <tr>
                  <th>性别</th>
                  <th>身高</th>
                  <th>体重</th>
                  <th>阵营</th>
                  <th>属性</th>
                </tr>
                <tr>
                  <td>{detail?.gender}</td>
                  <td>{detail?.height}</td>
                  <td>{detail?.weight}</td>
                  <td>{detail?.camp}</td>
                  <td>{detail?.attributes}</td>
                </tr>
                <tr>
                  <th colSpan={4}>Hit信息</th>
                  <th colSpan={1}>Cost</th>
                </tr>
                <tr>
                  <th>Quick</th>
                  <th>Arts</th>
                  <th>Buster</th>
                  <th>Extra</th>
                  <td rowSpan={2}>12</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3</td>
                  <td>3</td>
                  <td>5</td>
                </tr>
                <tr>
                  <th colSpan={4}>配卡信息</th>
                  <th colSpan={4}>礼装</th>
                </tr>
                <tr>
                  <td colSpan={4}>
                    {calcCardTypeNumber(detail?.card_quick, Quick)}
                    {calcCardTypeNumber(detail?.card_arts, Arts)}
                    {calcCardTypeNumber(detail?.card_buster, Buster)}
                  </td>
                  <td>
                    {suitList?.map((item: any) => (
                      <Image
                        key={item.id}
                        src={item?.icon_url}
                        alt=""
                        width={40}
                        height={40}
                      />
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  // 获取从者信息
  const {
    params: { id },
  } = context;
  const [, res] = await getServentDetail({ id });
  const {
    d: { data: detail },
  } = res as any;

  // 获取从者礼装
  const suitIds = detail.equips?.split('|').filter((item: string) => item);
  const suitData = await Promise.all(
    suitIds.map((item: string) => getServentSuit({ val: item }))
  );
  const suitList = suitData.map((item: any) => {
    const [, res] = item;
    return res.d.data;
  });

  return {
    // Passed to the page component as props
    props: { detail, suitList },
  };
}
