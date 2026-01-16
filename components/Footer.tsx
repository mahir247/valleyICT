import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import profile from '@/images/profile.png';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-4 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: General Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-4">Our Store</h3>
                        <p className="text-sm leading-relaxed">
                            We provide the best quality products for your daily needs.
                            Visit us for an amazing shopping experience.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <span>Khagdohor Bazar Sadar Mymensingh</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-blue-500" />
                                <span>+880 1943-665958</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-blue-500" />
                                <span>valleyictbd24@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Google Map Placeholder */}
                    <div className="flex flex-col h-full">
                        <h3 className="text-xl font-semibold text-white mb-4">Find Us</h3>
                        <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden relative">
                            {/* Placeholder for Iframe */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.4689607948244!2d90.3657913!3d24.7793904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375649e1f128bcbf%3A0xbc54c408bdae47e8!2sValley%20ICT!5e0!3m2!1sen!2sbd!4v1766649473119!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Store Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Column: Owner Info & Social */}
                    <div className="flex flex-col items-start md:items-end text-left md:text-right">
                        <h3 className="text-xl font-semibold text-white mb-4">Owner Profile</h3>
                        <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                                {/* Demo Image - using a placeholder service or asset if available. 
                     For now using a generic div placeholder if no image exists 
                     but assuming Next/Image usage pattern.
                 */}
                                <Image
                                    src={profile}
                                    alt="Owner"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-white">Yaqub Al Mahir</h4>
                                <span className="text-sm text-gray-400">Proprietor</span>
                            </div>
                        </div>
                        <p className="text-sm mb-6 max-w-xs leading-relaxed">
                            &quot;Dedicated to serving our community with integrity and quality since 2010.&quot;
                        </p>

                        <div className="flex gap-4">
                            <Link href="https://www.facebook.com/share/1CFzBbGLtk/" target='_blank' className="hover:text-blue-500 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="hover:text-pink-500 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="hover:text-sky-500 transition-colors">
                                <Twitter className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="hover:text-blue-700 transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Valley ICT. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
