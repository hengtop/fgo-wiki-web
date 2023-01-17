import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Head from 'next/head';

import TdTemplate from '@/components/td-template';

import styles from './index.module.scss';

import Arts from '@/public/static/80px-Arts.png';
import Buster from '@/public/static/80px-Buster.png';
import Quick from '@/public/static/80px-Quick.png';

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
        <Image
          width={80}
          height={80}
          alt=""
          src={imageSrc}
          key={index + String(imageSrc) + ''}
        />
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
          <div className={styles['left-box']}>
            <Image alt="" src={detail?.pic1} width={318.23} height={478.33} />
            <div className={styles['ability-indicator']}>
              <table border={1} width="100%" align="center">
                <tbody>
                  <tr>
                    <th colSpan={3}>数值面板</th>
                  </tr>
                  <tr>
                    <th>筋力</th>
                    <th>耐久</th>
                    <th>敏捷</th>
                  </tr>
                  <tr>
                    <td>{detail?.gluten}</td>
                    <td>{detail?.durable}</td>
                    <td>{detail?.agile}</td>
                  </tr>
                  <tr>
                    <th>魔力</th>
                    <th>幸运</th>
                    <th>宝具</th>
                  </tr>
                  <tr>
                    <td>{detail?.magic}</td>
                    <td>{detail?.lucky}</td>
                    <td>{detail?.treasure}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles['base-info']}>
            <table border={1} width="100%" align="center">
              <tbody>
                <tr>
                  <th colSpan={5}>{detail?.name}</th>
                </tr>
                <tr>
                  <th>中</th>
                  <th>日</th>
                  <th>英</th>
                  <th>CV</th>
                  <th>画师</th>
                </tr>
                <tr className={styles['h-80px']}>
                  <td>{detail?.disp_name}</td>
                  <td>{detail?.name_jp}</td>
                  <td>{detail?.name_en}</td>
                  <td>{detail?.cv}</td>
                  <td>{detail?.illust}</td>
                </tr>
                <tr>
                  <th>性别</th>
                  <th>身高</th>
                  <th>体重</th>
                  <th>阵营</th>
                  <th>属性</th>
                </tr>
                <tr className={styles['h-80px']}>
                  <td>{detail?.gender}</td>
                  <td>{detail?.height}</td>
                  <td>{detail?.weight}</td>
                  <td>{detail?.camp}</td>
                  <td>{detail?.attributes}</td>
                </tr>
                <tr>
                  <th>地域</th>
                  <th>出处</th>
                  <th>昵称</th>
                  <th colSpan={2}>特性</th>
                </tr>
                <tr className={styles['h-80px']}>
                  <td>{detail?.region}</td>
                  <td>{detail?.origin}</td>
                  <td>{detail?.aliases}</td>
                  <td colSpan={2}>{detail?.property}</td>
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
                  <td>{detail?.quihit}</td>
                  <td>{detail?.arthit}</td>
                  <td>{detail?.bushit}</td>
                  <td>{detail?.exhit}</td>
                </tr>
                <tr>
                  <th colSpan={3}>配卡信息</th>
                  <th colSpan={2}>礼装</th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    {calcCardTypeNumber(detail?.card_quick, Quick)}
                    {calcCardTypeNumber(detail?.card_arts, Arts)}
                    {calcCardTypeNumber(detail?.card_buster, Buster)}
                  </td>
                  <td colSpan={2} className={styles['suit-td']}>
                    {suitList?.map((item: any) => (
                      <Image
                        key={item.id}
                        src={item?.icon_url}
                        alt=""
                        width={80}
                        height={80}
                      />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>出星率</th>
                  <th colSpan={2}>即死补正</th>
                  <th>集星权重</th>
                </tr>
                <tr>
                  <td colSpan={2}>{detail?.crit}</td>
                  <td colSpan={2}>{detail?.death}</td>
                  <td>{detail?.critpr}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles['sec-info']}>
          <table border={1} width="100%" align="center">
            <tbody>
              <tr>
                <th colSpan={6}>NP获取率</th>
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    'Arts',
                    'Buster',
                    'Quick',
                    'Extra',
                    '宝具',
                    '防御(受击)',
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="td"
                  originData={detail}
                  values={[
                    'tdpointa',
                    'tdpointb',
                    'tdpointq',
                    'tdpointex',
                    'initiativenp',
                    'passive',
                  ]}
                />
              </tr>
            </tbody>
          </table>
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
    fallback: 'blocking', // can also be true or 'blocking'
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
