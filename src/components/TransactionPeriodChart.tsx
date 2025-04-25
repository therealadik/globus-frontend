import React from 'react';
import { TransactionCountByPeriodDto } from '../api/generated/src/models';
import { ResponsivePie } from '@nivo/pie';

interface TransactionPeriodChartProps {
  data: TransactionCountByPeriodDto;
}

const TransactionPeriodChart: React.FC<TransactionPeriodChartProps> = ({ data }) => {
  const chartData = [
    {
      id: 'Yearly',
      label: 'Yearly',
      value: data.yearlyCount || 0,
      color: '#8884d8'
    },
    {
      id: 'Quarterly',
      label: 'Quarterly',
      value: data.quarterlyCount || 0,
      color: '#82ca9d'
    },
    {
      id: 'Monthly',
      label: 'Monthly',
      value: data.monthlyCount || 0,
      color: '#ffc658'
    },
    {
      id: 'Weekly',
      label: 'Weekly',
      value: data.weeklyCount || 0,
      color: '#ff8042'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[400px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Transaction Count by Period</h3>
      <div className="h-[300px]">
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          enableArcLinkLabels={true}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  );
};

export default TransactionPeriodChart; 