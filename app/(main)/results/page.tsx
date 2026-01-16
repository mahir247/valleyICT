"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Search, GraduationCap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
interface Result {
    name: string;
    roll: string;
    result: string;
    certificate_url?: string;
}

function ResultPageContent() {
    const searchParams = useSearchParams();
    const rollParam = searchParams.get('roll');

    const [query, setQuery] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [allResults, setAllResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('/api/results');
                if (!res.ok) {
                    let errMsg = 'সার্ভার থেকে রেজাল্ট লোড করা যাচ্ছে না';
                    try {
                        const err = await res.json();
                        errMsg = err?.error || errMsg;
                    } catch {
                        // ignore
                    }
                    setError(errMsg);
                    setAllResults([]);
                    return;
                }

                const data = await res.json();
                if (data.success && Array.isArray(data.results)) {
                    const normalized = data.results.map((r: unknown) => {
                        const obj = r as { certificate_url?: string } & Record<string, any>;
                        return {
                            ...obj,
                            certificate_url: obj.certificate_url || obj.certificateUrl || '',
                        } as Result;
                    });
                    setAllResults(normalized);
                } else {
                    setAllResults([]);
                }
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('কনেকশনে সমস্যা হয়েছে');
                setAllResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    useEffect(() => {
        if (rollParam) {
            setQuery(rollParam);
            const foundResult = allResults.find((r) => r.roll === rollParam.trim());
            setResult(foundResult || null);
            setHasSearched(true);
        }
    }, [rollParam, allResults]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const foundResult = allResults.find((r) => r.roll === query.trim());
        setResult(foundResult || null);
        setHasSearched(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Check Your Result
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your roll number below to view your exam results.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="roll-number" className="sr-only">
                                Roll Number
                            </label>
                            <div className="relative">
                                <input
                                    id="roll-number"
                                    name="roll"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors"
                                    placeholder="Enter your Roll Number"
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
                            Search Result
                        </button>
                    </div>
                </form>

                {hasSearched && (
                    <div className="mt-8 transition-all duration-300 ease-in-out">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="text-gray-600">Loading result...</div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : result ? (
                            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
                                <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-medium text-green-800">
                                        Result Found
                                    </h3>
                                </div>
                                <div className="px-6 py-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                                {result.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Roll Number
                                            </p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                                {result.roll}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm font-medium text-gray-500">Result</p>
                                        <p className="mt-1 text-2xl font-bold text-purple-600">
                                            {result.result}
                                        </p>
                                    </div>

                                    {result.certificate_url && (
                                        <div className="pt-4">
                                            <a
                                                href={result.certificate_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 hover:underline"
                                            >
                                                View Certificate &rarr;
                                            </a>
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
                                        No Result Found
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>
                                            We couldn't find any result for the roll number{" "}
                                            <span className="font-bold">"{query}"</span>. Please check
                                            your roll number and try again.
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

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultPageContent />
        </Suspense>
    );
}
