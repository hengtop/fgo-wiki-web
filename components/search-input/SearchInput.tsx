import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';

import styles from './index.module.scss';

interface ISearchInputProps {
  placeholder?: string;
  onSearch: (e: unknown) => void;
}

export default function SearchInput(props: ISearchInputProps) {
  const { placeholder = '请输入需要搜索的从者名称', onSearch } = props;
  const [value, setValue] = useState<string>('');
  const [searchParams, setSearchParams] = useState({
    type: 'in',
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(value);
    },
    [setValue]
  );

  const submit = useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => {
      const { id = '' } = e.target as any;
      switch (id) {
        case 'search-submit':
          // 直接搜索
          onSearch({ ...searchParams, value });
          break;
        case 'po-search': {
          const params = { ...searchParams, type: 'po', value };
          setSearchParams(params);
          onSearch(params);
          break;
        }
        case 'in-search': {
          const params = { ...searchParams, type: 'in', value };
          setSearchParams(params);
          onSearch(params);
          break;
        }
        case 'ad-search':
          break;
        default:
          return;
      }
    },
    [onSearch, setSearchParams, searchParams, value]
  );
  return (
    <div className={styles['input-wrapper']}>
      <input
        id="search-servent"
        type="text"
        value={value}
        className={styles.input}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <div onClick={submit} className={styles['option-wrapper']}>
        <button id="search-submit" className={styles['search-btn']}>
          搜索
        </button>
        {/* <button id="po-search" className={styles['search-btn']}>
          正序
        </button>
        <button id="in-search" className={styles['search-btn']}>
          倒序
        </button>
        <button id="ad-search" className={styles['search-btn']}>
          高级筛选
        </button> */}
      </div>
    </div>
  );
}
