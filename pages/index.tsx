import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import classnames from 'classnames';

import { getServentList } from '@/service/api';

import SearchInput from '@/components/search-input';

import styles from '../styles/index.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Index({ list }: { list: any }) {
  const [nextList, setNextList] = useState<typeof list>([]);
  const [pageParams, setPageParams] = useState({
    pn: 2,
    ps: 72,
  });
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [navList] = useState([
    {
      name: '从者图鉴',
    },
    {
      name: '礼装图鉴',
    },
  ]);
  const handleSearch = useCallback((params: any) => {
    console.log(params);
  }, []);

  async function fetchData(params: {
    pn: number | string;
    ps: number | string;
  }) {
    const [, res] = await getServentList(params, {
      proxy: true,
    });
    const newNextList = res?.d.list ?? [];
    if (newNextList.length < 72) {
      setIsLoadingOver(true);
    }
    console.log(newNextList);
    // 凭借再去重
    setNextList(nextList.concat(newNextList));
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
  return (
    <>
      <Head>
        <title>FGO图鉴</title>
      </Head>
      <header className={styles.header}>头部</header>
      <main className={styles.container}>
        <nav className={styles['main-nav']}>这是活动位</nav>
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
          <button onClick={getNextServentList}>加载下一页</button>
          {isLoadingOver && '你已经到达了人理的尽头'}
        </article>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const [, res] = await getServentList({
    pn: '1',
    ps: '72',
  });
  return {
    props: {
      list: res?.d.list,
    },
  };
}
