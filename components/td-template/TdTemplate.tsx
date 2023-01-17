import React from 'react';

type TdOrTh = 'td' | 'th';
interface TObject {
  value: string | number;
  colSpan?: number;
  rowSpan?: number;
}
interface ITdPropsType {
  tType: TdOrTh;
  originData?: any;
  values?: (string | TObject)[];
  titleList?: (string | TObject)[];
}

export default function TdTemplate(props: ITdPropsType) {
  const { tType = 'td', originData = {}, values = [], titleList = [] } = props;
  function CheckTemplate(type: TdOrTh) {
    if (type === 'td') {
      return valueToMap(values, type);
    }
    if (type === 'th') {
      return valueToMap(titleList, type);
    }
    function valueToMap(list: (string | TObject)[] = [], type: TdOrTh) {
      const TagType = type;
      return list.map((item: any, index) => {
        if (typeof item === 'object') {
          return (
            <TagType key={item?.value + index} {...item}>
              {type === 'td' ? originData[item?.value] : item?.value}
            </TagType>
          );
        }
        if (typeof item === 'string') {
          return (
            <TagType key={item + index}>
              {type === 'td' ? originData[item] : item}
            </TagType>
          );
        }
      });
    }
  }
  return <>{CheckTemplate(tType)}</>;
}
