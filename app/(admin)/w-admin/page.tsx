'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, MessageSquare, FileText, Calendar } from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Load statistics from server (hooks must be declared unconditionally before any early returns)
    const [counts, setCounts] = useState({ enrollments: '—', messages: '—', results: '—', seminars: '—' });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) return;
        let mounted = true;

        async function fetchStats() {
            setLoadingStats(true);
            try {
                const [enrRes, msgRes, resRes, semRes] = await Promise.all([
                    fetch('/api/enrollments').then(r => r.json()),
                    fetch('/api/messages').then(r => r.json()),
                    fetch('/api/results').then(r => r.json()),
                    fetch('/api/seminars').then(r => r.json()),
                ]);

                if (!mounted) return;

                setCounts({
                    enrollments: Array.isArray(enrRes.enrollments) ? String(enrRes.enrollments.length) : '0',
                    messages: Array.isArray(msgRes.messages) ? String(msgRes.messages.length) : '0',
                    results: Array.isArray(resRes.results) ? String(resRes.results.length) : '0',
                    seminars: Array.isArray(semRes.data) ? String(semRes.data.length) : String((semRes.seminars || []).length),
                });
            } catch (err) {
                console.error('Error fetching admin stats:', err);
            } finally {
                if (mounted) setLoadingStats(false);
            }
        }

        fetchStats();
        return () => { mounted = false; };
    }, [isAuthenticated]);

    // Show nothing while checking
    if (!isAuthenticated) {
        return null;
    }

    const stats = [
        {
            icon: Users,
            label: 'Total Enrollments',
            value: loadingStats ? 'Loading...' : counts.enrollments,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            icon: MessageSquare,
            label: 'New Messages',
            value: loadingStats ? 'Loading...' : counts.messages,
            color: 'bg-green-500',
            lightColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            icon: FileText,
            label: 'Student Results',
            value: loadingStats ? 'Loading...' : counts.results,
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            icon: Calendar,
            label: 'Upcoming Seminars',
            value: loadingStats ? 'Loading...' : counts.seminars,
            color: 'bg-orange-500',
            lightColor: 'bg-orange-50',
            textColor: 'text-orange-600'
        },
    ];

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to Valley ICT Admin Panel</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium mb-1">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {loadingStats ? (
                                            <span className="inline-flex items-center gap-2 text-sm opacity-80" aria-label="loading">
                                                <span className={`${stat.textColor} inline-flex items-center justify-center`}>
                                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                                </span>
                                            </span>
                                        ) : (
                                            stat.value
                                        )}
                                    </p>
                                </div>
                                <div className={`${stat.lightColor} p-3 rounded-lg`}>
                                    <Icon className={stat.textColor} size={28} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        onClick={() => router.push('/w-admin/seminar')}
                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
                    >
                        <Calendar className="text-purple-600 mb-2" size={24} />
                        <h3 className="font-semibold text-gray-900">Manage Seminar</h3>
                        <p className="text-sm text-gray-600">Set seminar dates</p>
                    </button>
                    <button
                        onClick={() => router.push('/w-admin/results')}
                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
                    >
                        <FileText className="text-purple-600 mb-2" size={24} />
                        <h3 className="font-semibold text-gray-900">Add Results</h3>
                        <p className="text-sm text-gray-600">Add student results</p>
                    </button>
                    <button
                        onClick={() => router.push('/w-admin/enrollments')}
                        className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
                    >
                        <Users className="text-purple-600 mb-2" size={24} />
                        <h3 className="font-semibold text-gray-900">View Enrollments</h3>
                        <p className="text-sm text-gray-600">Check enrollments</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
