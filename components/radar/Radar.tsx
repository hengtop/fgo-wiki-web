import { Radar, RadarConfig } from '@ant-design/plots';

interface IPropsRadarChartType {
  originData: {
    name: string;
    value: string;
  }[];
}

const rank: Record<string, number> = {
  E: 5,
  D: 10,
  C: 15,
  B: 20,
  A: 25,
  EX: 30,
};

// 根据数值来转换显示纵坐标
function valueToRank(value: number) {
  if (5 <= value && value < 10) return 'E';
  else if (10 >= value && value < 15) return 'D';
  else if (15 >= value && value < 20) return 'C';
  else if (20 >= value && value < 25) return 'B';
  else if (25 >= value && value < 30) return 'A';
  else if (30 >= value) return 'EX';
}

function rankTovalue(rankStr: string) {
  const arr = rankStr.match(/\+|\-/g);
  if (arr) {
    const baseRank = rankStr.replace(/\+|\-/g, '');
    if (arr.includes('-')) {
      return rank[baseRank] - arr.length;
    } else {
      return rank[baseRank] + arr.length;
    }
  }
  return rank[rankStr];
}

export default function RadarChart(props: IPropsRadarChartType) {
  const { originData = [] } = props;

  const data = originData.map((item) => ({
    name: `${item.name} ${item.value}`,
    value: rankTovalue(item.value),
  }));

  const config: RadarConfig = {
    autoFit: true,
    data: data,
    xField: 'name',
    yField: 'value',
    padding: [30, 0, 30, 0],
    meta: {
      value: {
        minLimit: 0,
        maxLimit: 30,
        tickCount: 7,
      },
    },
    xAxis: {
      label: {
        style: {
          fill: '#000',
          fillOpacity: 1,
        },
      },
      line: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0,0,0,0.04)',
      },
    },
    renderer: 'canvas',
    limitInPlot: false,
    yAxis: {
      label: {
        formatter: (v: string) => {
          if (+v < 5) return null;
          return valueToRank(+v);
        },
      },
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0,0,0,0.04)',
      },
    },
    lineStyle: {
      stroke: '#eeeff1',
    },
    area: {
      color: '#ee680e',
    },
    theme: {
      styleSheet: {
        backgroundColor: '#fff',
      },
    },
    tooltip: {
      showContent: false,
      showMarkers: false,
      showCrosshairs: false,
    },
  };
  return <Radar {...config} />;
}
