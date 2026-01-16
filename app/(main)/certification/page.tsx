"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Search, GraduationCap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Student {
    id: string;
    name: string;
    registrationNumber: string;
    roll: string;
    studentImageUrl?: string;
    certificateImageUrl?: string;
}

function CertificationPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const rollParam = searchParams.get('roll');

    const [query, setQuery] = useState("");
    const [certificate, setCertificate] = useState<Student | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [allCertificates, setAllCertificates] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch('/api/certificates');
                if (!res.ok) {
                    let errMsg = 'সার্ভার থেকে সার্টিফিকেট লোড করা যাচ্ছে না';
                    try {
                        const err = await res.json();
                        errMsg = err?.error || errMsg;
                    } catch {
                        // ignore parse errors
                    }
                    setError(errMsg);
                    setAllCertificates([]);
                    return;
                }

                const data = await res.json();
                if (data.success && Array.isArray(data.certificates)) {
                    const normalized = data.certificates.map((c: unknown) => {
                        const obj = c as { _id?: string; id?: string } & Record<string, unknown>;
                        return { id: obj._id || obj.id, ...obj } as unknown as Student;
                    });
                    setAllCertificates(normalized);
                } else {
                    setAllCertificates([]);
                }
            } catch (err) {
                console.error('Error fetching certificates:', err);
                setError('কনেকশনে সমস্যা হয়েছে');
                setAllCertificates([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    useEffect(() => {
        if (rollParam) {
            setQuery(rollParam);
            const searchTerm = rollParam.toLowerCase().trim();
            const foundCertificate = allCertificates.find(
                (c) => c.roll?.toLowerCase().trim() === searchTerm ||
                       c.registrationNumber?.toLowerCase().trim() === searchTerm ||
                       c.name?.toLowerCase().trim() === searchTerm ||
                       c.name?.toLowerCase().includes(searchTerm)
            );
            setCertificate(foundCertificate || null);
            setHasSearched(true);
        }
    }, [rollParam, allCertificates]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const searchTerm = query.toLowerCase().trim();
        const foundCertificate = allCertificates.find(
            (c) => c.roll?.toLowerCase().trim() === searchTerm ||
                   c.registrationNumber?.toLowerCase().trim() === searchTerm ||
                   c.name?.toLowerCase().trim() === searchTerm ||
                   c.name?.toLowerCase().includes(searchTerm)
        );
        setCertificate(foundCertificate || null);
        setHasSearched(true);
        
        // Update URL with roll parameter
        router.push(`/certification?roll=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Check Your Certificate
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your name, roll number, or registration number below to view your certificate.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="roll-number" className="sr-only">
                                Name, Roll Number, or Registration Number
                            </label>
                            <div className="relative">
                                <input
                                    id="roll-number"
                                    name="roll"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors"
                                    placeholder="Enter your Name, Roll Number, or Registration Number"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        if (hasSearched) setHasSearched(false); // Reset search state on typing
                                    }}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Search Certificate
                        </button>
                    </div>
                </form>

                {hasSearched && (
                    <div className="mt-8 transition-all duration-300 ease-in-out">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="text-gray-600">Loading certificate...</div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : certificate ? (
                            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
                                <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-medium text-green-800">
                                        Certificate Found
                                    </h3>
                                </div>
                                <div className="px-6 py-6 space-y-4">
                                    {/* Student Info */}
                                    <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-200 shrink-0">
                                            <Image
                                                src={certificate.studentImageUrl || "/images/profile.jpg"}
                                                alt={certificate.name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/images/profile.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-gray-900 truncate">
                                                {certificate.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Roll: <span className="font-semibold">{certificate.roll}</span>
                                            </p>
                                            {certificate.registrationNumber && (
                                                <p className="text-sm text-gray-600">
                                                    Registration: <span className="font-semibold">{certificate.registrationNumber}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Certificate Image */}
                                    {certificate.certificateImageUrl && (
                                        <div className="pt-4">
                                            <p className="text-sm font-medium text-gray-500 mb-3">Certificate</p>
                                            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <Image
                                                    src={certificate.certificateImageUrl}
                                                    alt={`${certificate.name}'s Certificate`}
                                                    fill
                                                    className="object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "/images/certificate-placeholder.jpg";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex items-start">
                                <div className="shrink-0">
                                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        No Certificate Found
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>
                                            We couldn't find any certificate for{" "}
                                            <span className="font-bold">"{query}"</span>. Please check
                                            your name, roll number, or registration number and try again.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CertificationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        }>
            <CertificationPageContent />
        </Suspense>
    );
}
