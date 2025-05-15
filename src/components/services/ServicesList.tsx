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
        <div className="mb-8 flex justify-center ">
          <div className="relative flex items-center  justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-700 to-red-900 shadow-lg">
            {IconComponent && (
              <IconComponent
                size={36}
                className="text-white"
              />
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2  text-primary-500 dark:text-inherit pl-2">
          {service.title}
        </h3>

        <p className=" text-gray-600 dark:text-gray-400 leading-relaxed text-wrap pl-2 pb-3 ">
          {service.description}
        </p>

        <div className="absolute right-0 w-24 h-59 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Card>
  );
};

export default ServicesList;