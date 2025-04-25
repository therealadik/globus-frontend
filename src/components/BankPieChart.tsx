import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { BankTransactionStatisticsDto } from '../api/generated/src/models';

interface BankPieChartProps {
  data: BankTransactionStatisticsDto[];
  type: 'sender' | 'receiver';
  title: string;
}

const BankPieChart: React.FC<BankPieChartProps> = ({ data, type, title }) => {
  // Group data by bank name
  const bankData = data.reduce((acc, item) => {
    const bankName = type === 'sender' ? item.senderBankName : item.receiverBankName;
    if (!bankName) return acc;
    
    if (!acc[bankName]) {
      acc[bankName] = 0;
    }
    acc[bankName] += item.transactionCount || 0;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array format for the chart
  const chartData = Object.entries(bankData).map(([bankName, count]) => ({
    id: bankName,
    label: bankName,
    value: count
  }));

  // Custom tooltip component
  const CustomTooltip = ({ datum }: any) => (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-2">
      <div className="text-sm font-medium text-gray-800">{datum.label}</div>
      <div className="text-sm text-gray-600">{datum.value.toLocaleString()} транзакций</div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[450px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">{title}</h3>
      <div className="h-[370px]">
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          enableArcLinkLabels={true}
          arcLinkLabelsSkipAngle={15}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={25}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          tooltip={CustomTooltip}
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
          theme={{
            tooltip: {
              container: {
                background: 'white',
                color: '#333',
                fontSize: '12px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }
            },
            labels: {
              text: {
                fontSize: 14,
                fontWeight: 'bold'
              }
            }
          }}
          valueFormat={(value) => `${value.toLocaleString()} шт.`}
        />
      </div>
    </div>
  );
};

export default BankPieChart; 