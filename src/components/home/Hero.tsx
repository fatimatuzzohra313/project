import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-r from-primary-400/20 to-primary-600/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-accent-400/20 to-accent-600/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 bottom-20 w-64 h-64 rounded-full bg-gradient-to-r from-secondary-400/20 to-secondary-600/20 blur-3xl"
        />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-secondary-950 dark:text-secondary-50">
                Transforming Ideas into <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Digital Reality</span>
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 mb-8">
                We build exceptional software solutions that drive innovation and business growth.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/services">
                <Button variant="primary" size="lg" className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-glow transition-all">
                  Our Services <ChevronRight className="ml-1" size={18} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <div className="bg-white/10 backdrop-blur-lg p-8 lg:p-10 rotate-3 shadow-2xl max-w-md mx-auto rounded-2xl border border-white/20">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Digital Solutions"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-lg px-5 py-3 rotate-[-3deg] rounded-xl border border-white/20">
                <span className="text-primary-500 dark:text-primary-400 font-semibold">Expert Solutions</span>
              </div>
              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-lg px-5 py-3 rotate-[3deg] rounded-xl border border-white/20">
                <span className="text-accent-500 dark:text-accent-400 font-semibold">Innovation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;