import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { handleClick } from '../top';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 opacity-90" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-20 bg-white dark:bg-gray-900 rounded-b-[50%] opacity-10" />
        <div className="absolute bottom-0 right-0 w-full h-20 bg-white dark:bg-gray-900 rounded-t-[50%] opacity-10" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white/80">
            Let's discuss how our expert team can help you achieve your business goals through innovative digital solutions.
          </p>
          <Link to="/contact">
            <Button
              variant="secondary"
              size="lg"
              className="shadow-xl"
              onClick={handleClick}
            >
              Get in Touch Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;