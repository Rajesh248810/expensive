import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Tag, LogOut, Wallet } from 'lucide-react';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/transactions', icon: Receipt, label: 'Transactions' },
        { path: '/categories', icon: Tag, label: 'Categories' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 w-full font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col hidden md:flex">
                <Link to="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="bg-indigo-600 outline-none p-2 rounded-lg">
                        <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
                        ExpenseFlow
                    </span>
                </Link>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname.includes(item.path);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : ''}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-gray-50/50">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-8 py-5 flex justify-between items-center w-full md:hidden">
                    <Link to="/" className="text-xl font-bold text-indigo-600">ExpenseFlow</Link>
                </header>
                <div className="p-8 max-w-6xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
