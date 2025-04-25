import { useAppState } from '../context/AppStateContext';
import CategoryPieChart from '../components/CategoryPieChart';
import TransactionPeriodCards from '../components/TransactionPeriodCards';
import BankPieChart from '../components/BankPieChart';
import VerticalBalanceOverview from '../components/VerticalBalanceOverview';

const DashboardPage = () => {
  const { appState } = useAppState();
  const { dashboard } = appState;

  if (dashboard.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (dashboard.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{dashboard.error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-content grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
      {/* IMPORTANT: All dashboard components should have the same height (400px) */}
      
      {/* Financial Overview */}
      {dashboard.data?.incomeExpenseComparison && (
        <VerticalBalanceOverview data={dashboard.data.incomeExpenseComparison} />
      )}

      {/* Transaction Period Cards */}
      {dashboard.data?.transactionCountByPeriod && (
        <TransactionPeriodCards 
          data={dashboard.data.transactionCountByPeriod} 
          transactionCount={dashboard.data.transactionCount}
        />
      )}

      {/* Category Statistics */}
      {dashboard.data?.transactionCategoryStats && (
        <>
          <CategoryPieChart 
            data={dashboard.data.transactionCategoryStats.incomeByCategory || {}} 
            title="Доходы по категориям"
          />
          <CategoryPieChart 
            data={dashboard.data.transactionCategoryStats.expenseByCategory || {}} 
            title="Расходы по категориям"
          />
        </>
      )}

      {/* Bank Statistics Charts */}
      {dashboard.data?.bankTransactionStatistics && (
        <>
          <BankPieChart 
            data={dashboard.data.bankTransactionStatistics} 
            type="sender"
            title="Транзакции по банкам-отправителям"
          />
          <BankPieChart 
            data={dashboard.data.bankTransactionStatistics} 
            type="receiver"
            title="Транзакции по банкам-получателям"
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage; 