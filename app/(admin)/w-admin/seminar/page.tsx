'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Seminar {
    id?: number;
    title: string;
    description: string;
    date: string;
}

export default function SeminarPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [id, setId] = useState("");
    const [seminars, setSeminars] = useState<Seminar[]>([
        { title: '', description: '', date: '' },
        { title: '', description: '', date: '' },
    ]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
            fetchSeminars();
        }

        fetchSeminars();
    }, [router]);

    const fetchSeminars = async () => {
        try {
            const response = await fetch('/api/seminars');
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
                setId(data.data[0]._id);
                setSeminars(data.data[0].seminars);
                setLoading(false);
            } else {
                setLoading(false);
                setMessage({ type: 'error', text: data.error || 'সেমিনার লোড করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error fetching seminars:', error);
            setLoading(false);
            setMessage({ type: 'error', text: 'সেমিনার লোড করতে সমস্যা হয়েছে' });
        }
    };

    const handleSeminarChange = (index: number, field: keyof Seminar, value: string) => {
        const updated = [...seminars];
        updated[index] = { ...updated[index], [field]: value };
        setSeminars(updated);
    };

    const handleSave = async () => {
        // Validate
        for (let i = 0; i < seminars.length; i++) {
            if (!seminars[i].title || !seminars[i].date) {
                setMessage({
                    type: 'error',
                    text: `সেমিনার ${i + 1} এর Title এবং Date দিতে হবে`,
                });
                return;
            }
        }

        setSaving(true);
        setMessage(null);

        try {
            const response = await fetch(`/api/seminars?id=${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ seminars }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'সেমিনার সফলভাবে সেভ হয়েছে!' });
                fetchSeminars();
            } else {
                setMessage({ type: 'error', text: data.error || 'সেভ করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error saving seminars:', error);
            setMessage({ type: 'error', text: 'সেভ করতে সমস্যা হয়েছে' });
        } finally {
            setSaving(false);
        }
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Seminar Management</h1>
                <p className="text-gray-600">Manage free seminar dates and information (Exactly 2 seminars)</p>
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

            {/* Seminar Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                { seminars.map((seminar, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Calendar className="text-purple-600" size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                সেমিনার {index + 1}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={seminar.title}
                                    onChange={(e) =>
                                        handleSeminarChange(index, 'title', e.target.value)
                                    }
                                    placeholder="Seminar title"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={seminar.description}
                                    onChange={(e) =>
                                        handleSeminarChange(index, 'description', e.target.value)
                                    }
                                    placeholder="Seminar description (optional)"
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 resize-none"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={seminar.date}
                                    onChange={(e) =>
                                        handleSeminarChange(index, 'date', e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="relative inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {/* Shimmer Effect */}
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"
                        style={{
                            width: '200%',
                            height: '200%',
                        }}
                    />

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-2">
                        <Save size={20} />
                        {saving ? 'Saving...' : 'Save Seminars'}
                    </span>
                </button>
            </div>
        </div>
    );
}
