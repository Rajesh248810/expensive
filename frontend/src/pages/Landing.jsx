import { Link } from 'react-router-dom';
import { Wallet, ArrowRight, BarChart3, ShieldCheck, Zap, Receipt } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">ExpenseFlow</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
                        Log in
                    </Link>
                    <Link
                        to="/register"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center lg:text-left lg:flex lg:items-center">
                <div className="lg:w-1/2 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium animate-fade-in">
                        <Zap className="h-4 w-4" />
                        <span>New: AI-powered insights coming soon</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                        Smart finance for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">modern life.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        Take control of your money with ExpenseFlow. Track every penny, set smart budgets, and visualize your financial future with our industry-leading analytics.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                        <Link
                            to="/register"
                            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group"
                        >
                            Start Tracking Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-6 pt-8 justify-center lg:justify-start text-gray-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-emerald-500" />
                            <span className="text-sm font-medium uppercase tracking-wider">Bank-grade security</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 mt-20 lg:mt-0 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[2rem] blur-2xl opacity-10"></div>
                    <div className="relative bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="h-8 bg-gray-100 rounded-lg w-1/3"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-24 bg-indigo-50 rounded-2xl"></div>
                                <div className="h-24 bg-emerald-50 rounded-2xl"></div>
                                <div className="h-24 bg-red-50 rounded-2xl"></div>
                            </div>
                            <div className="h-40 bg-gray-50 rounded-2xl w-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to manage money</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Powerful tools designed to simplify your financial life.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                                <Receipt className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expense Tracking</h3>
                            <p className="text-gray-600 leading-relaxed">Log expenses as they happen. Categorize them automatically and never lose track of a receipt again.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
                            <p className="text-gray-600 leading-relaxed">Visualize your spending patterns with beautiful interactive charts. Spot trends and save more effectively.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-violet-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-violet-600">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure by Design</h3>
                            <p className="text-gray-600 leading-relaxed">Your data is encrypted and stored securely. We use industry-standard security to keep your finances private.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-12 text-center text-gray-500 text-sm">
                <p>&copy; 2026 ExpenseFlow Inc. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
