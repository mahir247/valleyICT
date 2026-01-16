'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Trash2, AlertCircle, CheckCircle2, Mail, Calendar, User } from 'lucide-react';

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function MessagesPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
            fetchMessages();
        }
    }, [router]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            const data = await response.json();
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setAlertMessage({ type: 'error', text: 'মেসেজ লোড করতে সমস্যা হয়েছে' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('আপনি কি এই মেসেজ ডিলিট করতে চান?')) return;

        try {
            const response = await fetch(`/api/messages?_id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setAlertMessage({ type: 'success', text: 'মেসেজ ডিলিট হয়েছে!' });
                fetchMessages();
            } else {
                setAlertMessage({ type: 'error', text: data.error || 'ডিলিট করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            setAlertMessage({ type: 'error', text: 'ডিলিট করতে সমস্যা হয়েছে' });
        }
    };

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                <p className="text-gray-600">View contact form messages</p>
            </div>

            {/* Alert Message */}
            {alertMessage && (
                <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${alertMessage.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                >
                    {alertMessage.type === 'success' ? (
                        <CheckCircle2 size={20} />
                    ) : (
                        <AlertCircle size={20} />
                    )}
                    <span>{alertMessage.text}</span>
                </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 mb-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                        <MessageSquare size={32} />
                    </div>
                    <div>
                        <p className="text-purple-100 text-sm">Total Messages</p>
                        <p className="text-4xl font-bold">{messages.length}</p>
                    </div>
                </div>
            </div>

            {/* Messages Grid */}
            {messages.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
                    <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 text-lg">No messages yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Contact form submissions will appear here
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <MessageSquare className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{msg.name}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Email and Date */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail size={16} className="text-purple-600" />
                                    <span className="truncate">{msg.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{formatDate(msg.createdAt)}</span>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(msg._id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
