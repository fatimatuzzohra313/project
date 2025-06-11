import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
  const infoItems = [
    {
      icon: <MapPin size={24} />,
      title: 'Our Location',
      content: 'Suit #302, 3rd Floor, Alfalah Homes, 76/P, Allama Iqbal Road, PECHS Block 2, Karachi-Pakistan',
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Number',
      content: '+92 345 3064567, +92 333 3279656',
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Address',
      content: 'info@xaviasolutions.com',
      href: 'mailto:info@xaviasolutions.com',
    },
    {
      icon: <Clock size={24} />,
      title: 'Working Hours',
      content: 'Monday - Friday',
    },
  ];

  return (
    <div className="space-y-6">
      {infoItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start"
        >
          <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mr-4 flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            {item.href ? (
              <a 
                href={item.href} 
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.content}
              </a>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactInfo;