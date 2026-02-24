import { useState, useEffect } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import api from '../api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('categories/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            const response = await api.post('categories/', { name: newCategory });
            setCategories([...categories, response.data]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await api.delete(`categories/${id}/`);
            setCategories(categories.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-100 p-3 rounded-xl border border-indigo-200">
                    <Tag className="h-8 w-8 text-indigo-700" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Categories</h1>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <form onSubmit={handleAddCategory} className="flex gap-4">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category Name (e.g. Groceries)"
                        className="flex-1 rounded-xl border-gray-300 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 border outline-none shadow-sm transition-all duration-200"
                    />
                    <button
                        type="submit"
                        disabled={!newCategory.trim()}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md font-medium"
                    >
                        <Plus className="h-5 w-5" /> Add
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <li key={category.id} className="flex justify-between items-center p-5 hover:bg-gray-50 transition-colors group">
                                <span className="text-gray-800 font-medium text-lg flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                                    {category.name}
                                </span>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="p-8 text-center text-gray-500">No categories found. Add your first one above!</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
