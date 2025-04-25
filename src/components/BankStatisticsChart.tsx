import React from 'react';
import { BankTransactionStatisticsDto } from '../api/generated/src/models';
import { ResponsiveBar } from '@nivo/bar';

interface BankStatisticsChartProps {
  data: BankTransactionStatisticsDto[];
  type: 'sender' | 'receiver';
}

const BankStatisticsChart: React.FC<BankStatisticsChartProps> = ({ data, type }) => {
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
    bankName,
    transactions: count
  }));

  // Sort by transaction count
  chartData.sort((a, b) => b.transactions - a.transactions);

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[400px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        {type === 'sender' ? 'Банки-отправители' : 'Банки-получатели'}
      </h3>
      <div className="h-[300px]">
        <ResponsiveBar
          data={chartData}
          keys={['transactions']}
          indexBy="bankName"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Название банка',
            legendPosition: 'middle',
            legendOffset: 45
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Количество транзакций',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 12
                }
              },
              legend: {
                text: {
                  fontSize: 14,
                  fontWeight: 'bold'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default BankStatisticsChart; 