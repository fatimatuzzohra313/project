import React from 'react';
import { motion } from 'framer-motion';
import ServicesList from '../components/services/ServicesList';

const ServicesPage: React.FC = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/80">
              We offer a comprehensive range of digital solutions to help businesses thrive in today's technology-driven world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ServicesList />
        </div>
      </section>
      
      <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }} 
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Approach</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                At Xavia Solutions, we follow a collaborative and iterative approach to ensure we deliver solutions that perfectly meet your business needs. Our process is transparent, efficient, and focused on delivering exceptional results.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: '01',
                  title: 'Discovery',
                  description: 'We begin by understanding your business goals, challenges, and requirements through in-depth consultations.',
                },
                {
                  number: '02',
                  title: 'Design & Development',
                  description: 'Our team creates innovative solutions using the latest technologies and best practices in software development.',
                },
                {
                  number: '03',
                  title: 'Delivery & Support',
                  description: 'We deploy your solution and provide ongoing support to ensure optimal performance and user satisfaction.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl mb-4 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;