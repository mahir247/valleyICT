'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Save, Trash2, Edit, AlertCircle, CheckCircle2, Award } from 'lucide-react';

interface Result {
    id?: string;
    name: string;
    roll: string;
    result: string;
    certificateUrl: string;
}

export default function ResultsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<Result>({
        name: '',
        roll: '',
        result: '',
        certificateUrl: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
            fetchResults();
        }
    }, [router]);

    const fetchResults = async () => {
        try {
            const response = await fetch('/api/results');
            const data = await response.json();

            if (data.success && Array.isArray(data.results)) {
                const normalized = data.results.map((r: unknown) => {
                    const obj = r as { _id?: string; certificate_url?: string } & Record<string, any>;
                    return {
                        id: obj._id || obj.id,
                        name: obj.name,
                        roll: obj.roll,
                        result: obj.result,
                        certificateUrl: obj.certificate_url || obj.certificateUrl || '',
                    } as Result;
                });
                setResults(normalized);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Error fetching results:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof Result, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.roll || !formData.result || !formData.certificateUrl) {
            setMessage({ type: 'error', text: 'সব ফিল্ড পূরণ করতে হবে' });
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            const url = '/api/results';
            const method = editingId ? 'PUT' : 'POST';
            const body = editingId ? { ...formData, id: editingId } : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({
                    type: 'success',
                    text: editingId ? 'রেজাল্ট আপডেট হয়েছে!' : 'রেজাল্ট যুক্ত হয়েছে!',
                });
                setFormData({ name: '', roll: '', result: '', certificateUrl: '' });
                setEditingId(null);
                fetchResults();
            } else {
                setMessage({ type: 'error', text: data.error || 'সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error saving result:', error);
            setMessage({ type: 'error', text: 'সমস্যা হয়েছে' });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (result: Result) => {
        setFormData({
            name: result.name,
            roll: result.roll,
            result: result.result,
            certificateUrl: result.certificateUrl,
        });
        setEditingId(result.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('আপনি কি এই রেজাল্ট ডিলিট করতে চান?')) return;

        try {
            const response = await fetch(`/api/results?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'রেজাল্ট ডিলিট হয়েছে!' });
                fetchResults();
            } else {
                setMessage({ type: 'error', text: data.error || 'ডিলিট করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error deleting result:', error);
            setMessage({ type: 'error', text: 'ডিলিট করতে সমস্যা হয়েছে' });
        }
    };

    const handleCancelEdit = () => {
        setFormData({ name: '', roll: '', result: '', certificateUrl: '' });
        setEditingId(null);
    };

    if (!isAuthenticated || loading) {
        return (
            <div className="p-6 lg:p-10 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Results</h1>
                <p className="text-gray-600">Add and manage student results</p>
            </div>

            {/* Message Alert */}
            {message && (
                <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                >
                    {message.type === 'success' ? (
                        <CheckCircle2 size={20} />
                    ) : (
                        <AlertCircle size={20} />
                    )}
                    <span>{message.text}</span>
                </div>
            )}

            {/* Add/Edit Form */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-3 rounded-lg">
                        <FileText className="text-purple-600" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingId ? 'রেজাল্ট এডিট করুন' : 'নতুন রেজাল্ট যুক্ত করুন'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Student Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter student name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Roll Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Roll Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.roll}
                            onChange={(e) => handleInputChange('roll', e.target.value)}
                            placeholder="Enter roll number"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Result */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Result <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.result}
                            onChange={(e) => handleInputChange('result', e.target.value)}
                            placeholder="e.g., Passed, A+, 85%"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Certificate URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Certificate URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.certificateUrl}
                            onChange={(e) => handleInputChange('certificateUrl', e.target.value)}
                            placeholder="https://example.com/certificate.pdf"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="relative inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-linear-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Save size={18} />
                                {saving ? 'Saving...' : editingId ? 'Update Result' : 'Add Result'}
                            </span>
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Results Grid */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">All Results</h2>
                {results.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
                        <p className="text-gray-500">No results added yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((result) => (
                            <div
                                key={result.id}
                                className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Award className="text-purple-600" size={20} />
                                        <span className="font-semibold text-gray-900">{result.name}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Roll:</span> {result.roll}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Result:</span> {result.result}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(result)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(result.id!)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
