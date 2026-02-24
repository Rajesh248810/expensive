import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('dashboard/');
                setSummary(response.data);
            } catch (error) {
                console.error('Error fetching dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const chartData = [
        { name: 'Income', value: Number(summary?.total_income) || 0, color: '#10B981' },
        { name: 'Expense', value: Number(summary?.total_expense) || 0, color: '#EF4444' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Overview</h1>
                <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    Last 30 Days
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute -right-6 -top-6 bg-gradient-to-br from-indigo-100 to-indigo-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Balance</p>
                            <h3 className="text-3xl font-bold text-gray-900">${summary?.balance?.toFixed(2) || '0.00'}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <DollarSign className="h-6 w-6 text-indigo-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute -right-6 -top-6 bg-gradient-to-br from-emerald-100 to-emerald-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Income</p>
                            <h3 className="text-3xl font-bold text-emerald-600">+${summary?.total_income?.toFixed(2) || '0.00'}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute -right-6 -top-6 bg-gradient-to-br from-red-100 to-red-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Expenses</p>
                            <h3 className="text-3xl font-bold text-red-600">-${summary?.total_expense?.toFixed(2) || '0.00'}</h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-xl">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Income vs Expense</h3>
                    <div className="h-72 w-full">
                        {(summary?.total_income > 0 || summary?.total_expense > 0) ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `$${value}`}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                No data available to display chart.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Transactions List */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                        <span className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium">View All</span>
                    </div>

                    <div className="space-y-4">
                        {summary?.recent_transactions?.length > 0 ? (
                            summary.recent_transactions.map((transaction) => (
                                <div key={transaction.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${transaction.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {transaction.type === 'INCOME' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{transaction.category_name}</p>
                                            <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold ${transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No recent transactions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
