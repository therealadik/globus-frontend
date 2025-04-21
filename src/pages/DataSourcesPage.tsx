import React from 'react';
import { Table } from 'antd';
import { useAppState } from '../context/AppStateContext';

const DataSourcesPage: React.FC = () => {
  const { appState } = useAppState();
  const { banks, categories } = appState;

  const categoryColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const bankColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Categories Table */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col h-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории</h2>
        <div className="flex-1 overflow-auto">
          <Table
            dataSource={categories}
            columns={categoryColumns}
            rowKey="id"
            pagination={false}
            scroll={{ y: 'calc(100vh - 300px)' }}
          />
        </div>
      </div>

      {/* Banks Table */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col h-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Банки</h2>
        <div className="flex-1 overflow-auto">
          <Table
            dataSource={banks}
            columns={bankColumns}
            rowKey="id"
            pagination={false}
            scroll={{ y: 'calc(100vh - 300px)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataSourcesPage; 