import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { services } from '../../data/services';
import * as LucideIcons from 'lucide-react';
import { handleClick } from '../top';

const FeaturedServices: React.FC = () => {
  // Only show 6 services on the home page
  const featuredServices = services.slice(0, 6);

  return (
    <section className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We offer a comprehensive range of digital services to help your business thrive in the digital age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => {
            const IconComponent = (LucideIcons as any)[service.icon];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="p-6 h-full flex flex-col">
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 w-fit mb-4">
                    {IconComponent && <IconComponent size={24} className="text-primary-600 dark:text-primary-400" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{service.description}</p>
                  {/* <Link to={`/services`} className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:underline mt-auto">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </Link> */}
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={handleClick}
            >
              View All Services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;