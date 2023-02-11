import type { ServentSuitDetailData, ServentDetailType } from '@/service/types';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import TdTemplate from '@/components/td-template';
import Swiper from '@/components/swiper';
const Radar = dynamic(() => import('@/components/radar'), {
  ssr: false,
});

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

interface IPropsType {
  detail: ServentDetailType;
  suitList: ServentSuitDetailData[];
}

export default function Index({ detail, suitList }: IPropsType) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{detail?.name}</title>
      </Head>
      <div className={styles['main-info']}>
        <h2 className={styles['main-title']}>{detail?.name}</h2>
        <div className={styles['top-info']}>
          <div className={styles['left-box']}>
            <Swiper
              dataList={[
                detail?.pic1,
                detail?.pic2,
                detail?.pic3,
                detail?.pic4,
              ]}
              width={318.23}
              height={478.33}
            />
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
              <div className={styles['ability-radar-chart']}>
                <Radar
                  originData={[
                    {
                      name: '筋力',
                      value: detail?.gluten,
                    },
                    {
                      name: '耐久',
                      value: detail?.durable,
                    },
                    {
                      name: '敏捷',
                      value: detail?.agile,
                    },
                    {
                      name: '魔力',
                      value: detail?.gluten,
                    },
                    {
                      name: '幸运',
                      value: detail?.magic,
                    },
                    {
                      name: '宝具',
                      value: detail?.treasure,
                    },
                  ]}
                />
              </div>
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
                    {suitList?.map(
                      (item: ServentSuitDetailData) =>
                        item?.id && (
                          <Image
                            key={item?.id}
                            src={item?.icon_url}
                            alt=""
                            width={80}
                            height={80}
                          />
                        )
                    )}
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
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    {
                      value: 'HP',
                      colSpan: 6,
                    },
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    '等级',
                    '初始',
                    '最终',
                    'Lv.80',
                    'Lv.90',
                    'Lv.100',
                  ]}
                />
              </tr>
              <tr>
                <th></th>
                <TdTemplate
                  tType="td"
                  originData={detail}
                  values={[
                    'lv1_hp',
                    'lvmax4_hp',
                    'lv80_hp',
                    'lv90_hp',
                    'lv100_hp',
                  ]}
                />
              </tr>

              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    {
                      value: 'ATK',
                      colSpan: 6,
                    },
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    '等级',
                    '初始',
                    '最终',
                    'Lv.80',
                    'Lv.90',
                    'Lv.100',
                  ]}
                />
              </tr>
              <tr>
                <th></th>
                <TdTemplate
                  tType="td"
                  originData={detail}
                  values={[
                    'lv1_atk',
                    'lvmax4_atk',
                    'lv80_atk',
                    'lv90_atk',
                    'lv100_atk',
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    {
                      value: '羁绊点数',
                      colSpan: 6,
                    },
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={['等级', 'Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5']}
                />
              </tr>
              <tr>
                <th>点数</th>
                <TdTemplate
                  tType="td"
                  originData={detail}
                  values={['jb_lv1', 'jb_lv2', 'jb_lv3', 'jb_lv4', 'jb_lv5']}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={['', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']}
                />
              </tr>
              <tr>
                <th></th>
                <TdTemplate
                  tType="td"
                  originData={detail}
                  values={['jb_lv6', 'jb_lv7', 'jb_lv8', 'jb_lv9', 'jb_lv10']}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={['', 'Lv.11', 'Lv.12', 'Lv.13', 'Lv.14', 'Lv.15']}
                />
              </tr>
              <tr>
                <th></th>
                <TdTemplate
                  tType="td"
                  originData={detail}
                  values={[
                    'jb_lv11',
                    'jb_lv12',
                    'jb_lv13',
                    'jb_lv14',
                    'jb_lv15',
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={[
                    {
                      value: '羁绊奖励',
                      colSpan: 6,
                    },
                  ]}
                />
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={['等级', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']}
                />
              </tr>
              <tr>
                <th>奖励</th>
                {detail?.jb_pri
                  ?.split('|')
                  ?.slice(0, 5)
                  ?.map((item: string, index: number) => (
                    <td key={index}>{item}</td>
                  ))}
              </tr>
              <tr>
                <TdTemplate
                  tType="th"
                  titleList={['', 'Lv.11', 'Lv.12', 'Lv.13', 'Lv.14', 'Lv.15']}
                />
              </tr>
              <tr>
                <th></th>
                {detail?.jb_pri
                  ?.split('|')
                  ?.slice(5)
                  ?.map((item: string, index: number) => (
                    <td key={index}>{item}</td>
                  ))}
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
  const detail = res?.d.data;

  // 获取从者礼装
  const suitIds =
    detail?.equips?.split('|').filter((item: string) => item) || [];
  const suitData = await Promise.all(
    suitIds.map((item: string) => getServentSuit({ val: item }))
  );
  const suitList = suitData.map((item) => {
    const [, res] = item;
    return res?.d.data;
  });

  return {
    // Passed to the page component as props
    props: { detail, suitList },
  };
}
