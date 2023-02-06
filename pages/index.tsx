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

  const handleSearch = useCallback((params: any) => {
    console.log(params);
  }, []);

  async function fetchData(params: {
    pn: number | string;
    ps: number | string;
  }) {
    setIsLoading(true);
    const [, res] = await getServentList(params, {
      proxy: true,
    });
    const newNextList = res?.d.list ?? [];
    if (newNextList.length < 70) {
      setIsLoadingOver(true);
    }
    console.log(newNextList);
    // 凭借再去重
    setNextList(nextList.concat(newNextList));
    setIsLoading(false);
  }

  function getNextServentList() {
    if (isLoadingOver) return;
    const newPageParams = {
      pn: pageParams.pn + 1,
      ps: pageParams.ps,
    };
    fetchData(newPageParams);
    // 保存分页数据
    setPageParams(newPageParams);
  }

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
      <header className={styles.header}>头部</header>
      <main className={styles.container}>
        <nav className={styles['main-nav']}>
          <Swiper width={800} height={300} dataList={activeInfo?.headImages} />
        </nav>
        <article>
          <div className={styles['nav-container']}>
            {navList.map((item, index) => {
              return (
                <nav className={styles['nav-item']} key={index}>
                  <a>{item.name}</a>
                </nav>
              );
            })}
          </div>
          <div className={styles['search-container']}>
            <SearchInput onSearch={handleSearch} />
          </div>
          <div className={styles['list-container']}>
            {list?.map((item: any, index: any) => {
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
            {nextList?.map((item: any, index: any) => {
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
