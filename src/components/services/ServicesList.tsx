import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Card from '../ui/Card';
import { services } from '../../data/services';
import { ServiceItem } from '../../types';

const ServicesList: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </motion.div>
  );
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = (LucideIcons as any)[service.icon];

  return (
    <Card className="group p-8 hover:translate-y-[-10px]">
      <div className="relative">
        <div className="mb-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-full w-fit">
              {IconComponent && (
                <IconComponent 
                  size={32} 
                  className="text-transparent bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text" 
                />
              )}
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {service.description}
        </p>

        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Card>
  );
};

export default ServicesList;