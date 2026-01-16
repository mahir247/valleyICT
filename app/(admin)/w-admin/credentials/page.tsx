'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Save, AlertCircle, CheckCircle2, Lock, User } from 'lucide-react';

export default function CredentialsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [formData, setFormData] = useState({
        currentUsername: '',
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (!formData.currentUsername || !formData.currentPassword || !formData.newUsername || !formData.newPassword || !formData.confirmPassword) {
            setMessage({ type: 'error', text: 'সব ফিল্ড পূরণ করতে হবে' });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড মিলছে না' });
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' });
            return;
        }

        setSaving(true);

        try {
            const response = await fetch('/api/credentials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentUsername: formData.currentUsername,
                    currentPassword: formData.currentPassword,
                    newUsername: formData.newUsername,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'ক্রেডেনশিয়াল আপডেট হয়েছে! নতুন ক্রেডেনশিয়াল দিয়ে লগইন করুন।' });
                setFormData({
                    currentUsername: '',
                    currentPassword: '',
                    newUsername: '',
                    newPassword: '',
                    confirmPassword: '',
                });

                // Logout after 2 seconds
                setTimeout(() => {
                    localStorage.removeItem('token');
                    router.push('/w-admin/login');
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.error || 'আপডেট করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error updating credentials:', error);
            setMessage({ type: 'error', text: 'আপডেট করতে সমস্যা হয়েছে' });
        } finally {
            setSaving(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Credentials</h1>
                <p className="text-gray-600">Update admin username and password</p>
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

            {/* Form Card */}
            <div className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Key className="text-purple-600" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Update Credentials</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Credentials Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                                Current Credentials
                            </h3>

                            {/* Current Username */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Username <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.currentUsername}
                                        onChange={(e) => handleInputChange('currentUsername', e.target.value)}
                                        placeholder="Enter current username"
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                    />
                                </div>
                            </div>

                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                        placeholder="Enter current password"
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* New Credentials Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                                New Credentials
                            </h3>

                            {/* New Username */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    New Username <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.newUsername}
                                        onChange={(e) => handleInputChange('newUsername', e.target.value)}
                                        placeholder="Enter new username"
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                    />
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                        placeholder="Enter new password (min 6 characters)"
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirm New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full relative inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Save size={20} />
                                {saving ? 'Updating...' : 'Update Credentials'}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">Important:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>You will be logged out after updating credentials</li>
                                <li>Login again with your new username and password</li>
                                <li>Password must be at least 6 characters long</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
