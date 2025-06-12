import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { handleClick } from '../top';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-display font-bold text-white mb-4 inline-block">
              Xavia<span className="text-accent-500">Solutions</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Delivering exceptional software solutions and digital experiences that transform businesses.
            </p>
            <div className="flex space-x-4 mt-6">
              <a target='blank' href="https://www.facebook.com/xaviasolutions" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
             
              <a target='blank' href="https://www.instagram.com/xaviasol/?igsh=bnFuMmxwdXNmNg%3D%3D#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a target='blank' href="https://www.linkedin.com/company/xaviasolutions/" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              <li onClick={handleClick}><Link to="/services" className="hover:text-primary-400 transition-colors">Digital Commerce</Link></li>
              <li onClick={handleClick}><Link to="/services" className="hover:text-primary-400 transition-colors">Business Applications</Link></li>
              <li onClick={handleClick}><Link to="/services" className="hover:text-primary-400 transition-colors">UX Design</Link></li>
              <li onClick={handleClick}><Link to="/services" className="hover:text-primary-400 transition-colors">App Modernization</Link></li>
              <li onClick={handleClick}><Link to="/services" className="hover:text-primary-400 transition-colors">Cloud Services</Link></li>
              <li onClick={handleClick}><Link to="/services" className="hover:text-primary-400 transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="hover:text-primary-400 transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary-400 flex-shrink-0 mt-1" />
                <span>Suit #302, 3rd Floor, Alfalah Homes, 76/P, Allama Iqbal Road, PECHS Block 2, Karachi-Pakistan</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary-400 flex-shrink-0" />
                <span>+92 345 3064567, +92 333 3279656</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@xaviasolutions.com" className="hover:text-primary-400 transition-colors">
                  info@xaviasolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Xavia Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;