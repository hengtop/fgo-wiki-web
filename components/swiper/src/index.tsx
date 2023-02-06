// Import Swiper React components
import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import styles from './index.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';

interface ISwiperPropsType {
  dataList: string[];
  width: number;
  height: number;
}

export default function Index(props: ISwiperPropsType) {
  const { dataList = [], width, height } = props;
  return (
    <div
      style={{
        width: width + 'px',
        height: height + 'px',
      }}
    >
      <Swiper
        loop
        pagination={true}
        modules={[Pagination]}
        className={styles['my-swiper']}
      >
        {dataList?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                priority={index === 0}
                alt=""
                width={width}
                height={height}
                src={item}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
