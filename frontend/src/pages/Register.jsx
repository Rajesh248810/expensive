import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, ArrowRight, Lock, Mail, User } from 'lucide-react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [illustrations, setIllustrations] = useState([]);
    const [currentIllustration, setCurrentIllustration] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIllustrations = async () => {
            try {
                const response = await axios.get('/illustrations/assets.json');
                setIllustrations(response.data);
            } catch (err) {
                console.error("Failed to fetch illustrations", err);
            }
        };
        fetchIllustrations();

        const interval = setInterval(() => {
            setCurrentIllustration((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/user/register/', {
                username,
                email,
                password,
            });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username might already exist.');
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans relative overflow-hidden">
            {/* Top Left Logo */}
            <div className="absolute top-8 left-8 flex items-center gap-3 z-10 transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/')}>
                <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
                    <Wallet className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    ExpenseFlow
                </h2>
            </div>

            <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Join thousands of users managing expenses smartly
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-10 px-4 shadow-2xl shadow-gray-200/50 sm:rounded-[2rem] sm:px-10 border border-gray-100/50 relative z-10">
                        <form className="space-y-6" onSubmit={handleRegister}>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 flex items-center justify-center text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">Username</label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 sm:text-sm border-gray-200 rounded-2xl py-3.5 border outline-none transition-all duration-200 text-gray-900 bg-white"
                                        placeholder="Choose a username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 sm:text-sm border-gray-200 rounded-2xl py-3.5 border outline-none transition-all duration-200 text-gray-900 bg-white"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">Password</label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 sm:text-sm border-gray-200 rounded-2xl py-3.5 border outline-none transition-all duration-200 text-gray-900 bg-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl text-md font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                                >
                                    Create Account <ArrowRight className="h-5 w-5" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-gray-500 font-medium">Already have an account? </span>
                            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Log in instead
                            </Link>
                        </div>
                    </div>

                    {/* Animation Section Under the Box */}
                    <div className="mt-12 overflow-hidden relative h-48 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-4 transition-all duration-1000 transform">
                            {illustrations.length > 0 && (
                                <div className="relative w-full flex flex-col items-center animate-fade-in-up">
                                    <img
                                        src={illustrations[currentIllustration].url}
                                        alt="animation"
                                        className="h-40 w-auto object-contain drop-shadow-2xl transition-all duration-700 transform hover:scale-110"
                                    />
                                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-indigo-400 opacity-60">
                                        {illustrations[currentIllustration].title}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
