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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   const res = await getServentList({
  //     pn: '1',
  //     action: 'list',
  //     ps: '72',
  //   });
  // }
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
                <Link key={item.id} href={`/servent/${item.id}`}>
                  <div className={styles['list-item']}>
                    <Image
                      alt="icon"
                      width={100}
                      height={100}
                      src={item.icon_url}
                    />
                    <div className={styles.name}>{item.name}</div>
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
