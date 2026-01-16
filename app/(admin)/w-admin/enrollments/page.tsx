'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Trash2, AlertCircle, CheckCircle2, Phone, Mail, Calendar, Eye, X } from 'lucide-react';
import Image from 'next/image';

interface Enrollment {
    _id: string;
    name: string;
    phone: string;
    email?: string;
    photo: string;
    nidPhoto: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export default function EnrollmentsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
            fetchEnrollments();
        }
    }, [router]);

    const fetchEnrollments = async () => {
        try {
            const response = await fetch('/api/enrollments');
            const data = await response.json();

            if (data.success) {
                setEnrollments(data.enrollments);
            }
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (_id: string) => {
        if (!confirm('আপনি কি এই এনরোলমেন্ট ডিলিট করতে চান?')) return;

        try {
            const response = await fetch(`/api/enrollments?_id=${_id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'এনরোলমেন্ট ডিলিট হয়েছে!' });
                fetchEnrollments();
            } else {
                setMessage({ type: 'error', text: data.error || 'ডিলিট করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error deleting enrollment:', error);
            setMessage({ type: 'error', text: 'ডিলিট করতে সমস্যা হয়েছে' });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'Pending' },
            approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Approved' },
            rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Rejected' },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}>
                {config.label}
            </span>
        );
    };

    const [selectedImage, setSelectedImage] = useState<{ url: string; type: 'photo' | 'nid' } | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }) + ' ' + date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollments</h1>
                <p className="text-gray-600">View all course enrollment submissions</p>
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

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 mb-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                        <Users size={32} />
                    </div>
                    <div>
                        <p className="text-purple-100 text-sm">Total Enrollments</p>
                        <p className="text-4xl font-bold">{enrollments.length}</p>
                    </div>
                </div>
            </div>

            {/* Enrollments Grid */}
            {enrollments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
                    <Users className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 text-lg">No enrollments yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Enrollment submissions will appear here
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.map((enrollment) => (
                            <div
                                key={enrollment._id}
                                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-purple-100 p-2 rounded-lg">
                                            <Users className="text-purple-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{enrollment.name}</h3>
                                        </div>
                                    </div>
                                    {getStatusBadge(enrollment.status)}
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={16} className="text-purple-600" />
                                        <span>{enrollment.phone}</span>
                                    </div>
                                    {enrollment.email && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail size={16} className="text-purple-600" />
                                            <span className="truncate">{enrollment.email}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>{formatDate(enrollment.createdAt)}</span>
                                    </div>

                                    {/* Photos Section */}
                                    <div className="pt-3 border-t border-gray-200">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">ছবি</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => setSelectedImage({ url: enrollment.photo, type: 'photo' })}
                                                className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors"
                                            >
                                                <Image
                                                    src={enrollment.photo}
                                                    alt="Student Photo"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                                                </div>
                                                <div className="absolute bottom-1 left-1 right-1">
                                                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">ছবি</span>
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => setSelectedImage({ url: enrollment.nidPhoto, type: 'nid' })}
                                                className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors"
                                            >
                                                <Image
                                                    src={enrollment.nidPhoto}
                                                    alt="NID Photo"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                                                </div>
                                                <div className="absolute bottom-1 left-1 right-1">
                                                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">এনআইডি</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(enrollment._id)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                                >
                                    <Trash2 size={18} />
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Image Modal */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="relative max-w-4xl max-h-[90vh] w-full">
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                                >
                                    <X size={32} />
                                </button>
                                <div className="bg-white rounded-lg overflow-hidden">
                                    <div className="bg-purple-600 text-white px-4 py-2">
                                        <h3 className="font-semibold">
                                            {selectedImage.type === 'photo' ? 'ছাত্র/ছাত্রীর ছবি' : 'এনআইডি কার্ড'}
                                        </h3>
                                    </div>
                                    <div className="relative w-full aspect-video bg-gray-100">
                                        <Image
                                            src={selectedImage.url}
                                            alt={selectedImage.type === 'photo' ? 'Student Photo' : 'NID Photo'}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
