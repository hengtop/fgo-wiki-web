import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import classnames from 'classnames';

import { getActiveInfo, getServentList } from '@/service/api';

import SearchInput from '@/components/search-input';
import Swiper from '@/components/swiper';

import styles from '../styles/index.module.scss';
import Loading from '@/components/loading';

const inter = Inter({ subsets: ['latin'] });

export default function Index({ list }: { list: any }) {
  const [nextList, setNextList] = useState<typeof list>([]);
  const [pageParams, setPageParams] = useState({
    pn: 2,
    ps: 70,
  });
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showBaseList, setShowBaseList] = useState(true);
  const [navList] = useState([
    {
      name: '从者图鉴',
    },
    {
      name: '礼装图鉴',
    },
  ]);
  const [activeInfo, setActiveInfo] = useState<Record<string, any>>();

  useEffect(() => {
    fetchActiveData();
  }, []);

  const fetchData = useCallback(
    async function fetchData(
      params: {
        pn?: number | string;
        ps?: number | string;
        wd?: string;
      },
      option?: { isSearchMore: boolean }
    ) {
      const { isSearchMore = true } = option || {};
      setShowBaseList(isSearchMore);
      const [, res] = await getServentList(params, {
        proxy: true,
      });
      const newNextList = res?.d.list ?? [];
      if (newNextList.length < 70) {
        setIsLoadingOver(true);
      } else {
        setIsLoadingOver(false);
      }
      // todo去重
      isSearchMore
        ? setNextList(nextList.concat(newNextList))
        : setNextList(newNextList);
    },
    [nextList]
  );

  async function getNextServentList() {
    if (isLoadingOver) return;
    setIsLoading(true);
    const newPageParams = {
      pn: pageParams.pn + 1,
      ps: pageParams.ps,
    };
    await fetchData(newPageParams);
    // 保存分页数据
    setPageParams(newPageParams);
    setIsLoading(false);
  }
  //搜索
  const handleSearch = useCallback(
    async (params: any) => {
      const { value: wd = '' } = params;
      setIsSearchLoading(true);
      setPageParams({
        pn: 1,
        ps: 70,
      });
      wd.length
        ? await fetchData({ wd }, { isSearchMore: false })
        : await fetchData(
            {
              pn: '1',
              ps: '70',
            },
            { isSearchMore: false }
          );
      setIsSearchLoading(false);
    },
    [fetchData, pageParams]
  );

  // 获取页面头图信息
  async function fetchActiveData() {
    const [err, res] = await getActiveInfo();
    const imgCon = res?.match(/<div id="container">([\s\S]*?)<\/div>/g)[0];
    const imgs = imgCon?.match(/(?<=(img[^>]*src="))[^"]*/g);
    setActiveInfo({
      headImages: imgs.map((item: string) => 'https:' + item),
    });
  }
  return (
    <>
      <Head>
        <title>FGO图鉴</title>
      </Head>
      <header className={styles.header}>FGO-WKII</header>
      <main className={styles.container}>
        <nav className={styles['main-nav']}>
          <Swiper width={800} height={300} dataList={activeInfo?.headImages} />
        </nav>
        <article>
          {/* <div className={styles['nav-container']}>
            {navList.map((item, index) => {
              return (
                <nav className={styles['nav-item']} key={index}>
                  <a>{item.name}</a>
                </nav>
              );
            })}
          </div> */}
          <div className={styles['search-container']}>
            <SearchInput onSearch={handleSearch} />
          </div>
          <div className={styles['list-container']}>
            {showBaseList &&
              list?.map((item: any, index: any) => {
                return (
                  <Link
                    key={item.id}
                    target="_blank"
                    href={`/servent/${item.id}`}
                  >
                    <div className={styles['list-item']}>
                      <Image
                        alt="icon"
                        width={100}
                        height={100}
                        src={item.icon_url}
                      />
                      <div className={styles.name}>
                        {item.name.replace('&amp;', '&')}
                      </div>
                    </div>
                  </Link>
                );
              })}
            {isSearchLoading ? (
              <div style={{ width: '100%', display: 'flex' }}>
                <Loading />
              </div>
            ) : (
              nextList?.map((item: any, index: any) => {
                return (
                  <Link
                    key={item.id}
                    target="_blank"
                    href={`/servent/${item.id}`}
                  >
                    <div className={styles['list-item']}>
                      <Image
                        alt="icon"
                        width={100}
                        height={100}
                        src={item.icon_url}
                      />
                      <div className={styles.name}>
                        {item.name.replace('&amp;', '&')}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}

            {new Array(10).fill(0).map((item, index) => {
              return (
                <div className={classnames(styles.layout)} key={index}></div>
              );
            })}
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles['loading-btn']}>
              {!isLoadingOver ? (
                <button onClick={getNextServentList}>加载更多</button>
              ) : (
                <span className={styles['loading-end-title']}>
                  你已经到达了人理的尽头
                </span>
              )}
            </div>
          )}
        </article>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const [, res] = await getServentList({
    pn: '1',
    ps: '70',
  });
  return {
    props: {
      list: res?.d.list,
    },
  };
}
