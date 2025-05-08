import React from 'react';
import { motion } from 'framer-motion';
import ProjectsList from '../components/projects/ProjectsList';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-secondary-600 to-primary-600 py-20 md:py-28 relative overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/80">
              Explore our portfolio of innovative solutions we've delivered across various industries and technologies.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProjectsList />
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;