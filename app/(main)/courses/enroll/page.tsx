"use client";

import { Phone, Mail, Send, UserCircle2, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

// Note: Metadata for client components is handled via layout.tsx
const EnrollPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        photo: null as File | null,
        nidPhoto: null as File | null,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [nidPreview, setNidPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.phone || !formData.photo || !formData.nidPhoto) {
            alert("অনুগ্রহ করে সব প্রয়োজনীয় তথ্য প্রদান করুন");
            return;
        }

        setIsSubmitting(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append("name", formData.name);
            submitFormData.append("phone", formData.phone);
            if (formData.email) {
                submitFormData.append("email", formData.email);
            }
            submitFormData.append("photo", formData.photo);
            submitFormData.append("nidPhoto", formData.nidPhoto);

            const response = await fetch("/api/enrollments", {
                method: "POST",
                body: submitFormData,
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message || "আপনার তথ্য সফলভাবে জমা হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
                setFormData({ name: "", phone: "", email: "", photo: null, nidPhoto: null });
                setPhotoPreview(null);
                setNidPreview(null);
            } else {
                alert(data.error || "কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file") {
            const file = e.target.files?.[0];
            if (file) {
                if (e.target.name === "photo") {
                    setFormData({ ...formData, photo: file });
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPhotoPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                } else if (e.target.name === "nidPhoto") {
                    setFormData({ ...formData, nidPhoto: file });
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setNidPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                }
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-purple-600">কোর্সে</span>{" "}
                        <span className="text-gray-900">ভর্তি হন</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন এবং আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Enrollment Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-purple-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <UserCircle2 className="text-purple-600" size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                ভর্তি ফর্ম
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    পূর্ণ নাম <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="আপনার পূর্ণ নাম লিখুন"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Phone Input */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    ফোন নাম্বার <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+880 1XXX XXXXXX"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    ইমেইল এড্রেস 
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Photo Upload */}
                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    নিজের ছবি <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-3">
                                    <label
                                        htmlFor="photo"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-purple-400 transition-all duration-300"
                                    >
                                        {photoPreview ? (
                                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                                <img
                                                    src={photoPreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Upload className="text-white" size={24} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImageIcon className="w-10 h-10 mb-2 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">ক্লিক করুন</span> অথবা ছবি টেনে আনুন
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            required
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* NID Card Photo Upload */}
                            <div>
                                <label
                                    htmlFor="nidPhoto"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    এনআইডি কার্ড এর ছবি <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-3">
                                    <label
                                        htmlFor="nidPhoto"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-purple-400 transition-all duration-300"
                                    >
                                        {nidPreview ? (
                                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                                <img
                                                    src={nidPreview}
                                                    alt="NID Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Upload className="text-white" size={24} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImageIcon className="w-10 h-10 mb-2 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">ক্লিক করুন</span> অথবা ছবি টেনে আনুন
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="nidPhoto"
                                            name="nidPhoto"
                                            accept="image/*"
                                            onChange={handleChange}
                                            required
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative w-full inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                            >
                                {/* Shimmer Effect */}
                                {!isSubmitting && (
                                    <span
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"
                                        style={{
                                            width: "200%",
                                            height: "200%",
                                        }}
                                    />
                                )}

                                {/* Button Content */}
                                <span className="relative z-10 flex items-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            জমা হচ্ছে...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            ফর্ম জমা দিন
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl p-8 md:p-10 text-white">
                            <h2 className="text-2xl font-bold mb-6">যোগাযোগ করুন</h2>
                            <p className="text-purple-100 mb-8">
                                কোন প্রশ্ন বা সাহায্যের প্রয়োজন হলে আমাদের সাথে যোগাযোগ করুন
                            </p>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">ফোন নাম্বার</h3>
                                        <a
                                            href="tel:+8801943665958"
                                            className="text-purple-100 hover:text-white transition-colors"
                                        >
                                            +880 1943-665958
                                        </a>
                                       
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">ইমেইল</h3>
                                        <a
                                            href="mailto:valleyictbd24@gmail.com"
                                            className="text-purple-100 hover:text-white transition-colors"
                                        >
                                            valleyictbd24@gmail.com
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                কেন আমাদের সাথে?
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>অভিজ্ঞ প্রশিক্ষক দ্বারা পরিচালিত</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>হাতে-কলমে প্রশিক্ষণ</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>চাকরির সহায়তা প্রদান</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>সার্টিফিকেট প্রদান</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollPage;
