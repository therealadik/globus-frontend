import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AppStateProvider} from './context/AppStateContext';
import {ToastProvider} from './context/ToastContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import PageLayout from './components/PageLayout';
import DataSourcesPage from "./pages/DataSourcesPage.tsx";

const App: React.FC = () => {
    return (
        <ToastProvider>
            <AppStateProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<AuthPage/>}/>
                        <Route path="/" element={
                            <PageLayout>
                                <DashboardPage/>
                            </PageLayout>
                        }/>
                        <Route path="/transactions" element={
                            <PageLayout>
                                <TransactionsPage/>
                            </PageLayout>
                        }/>
                        <Route path="/data-sources" element={
                            <PageLayout>
                                <DataSourcesPage/>
                            </PageLayout>
                        }/>
                    </Routes>
                </Router>
            </AppStateProvider>
        </ToastProvider>
    )
}

export default App; 