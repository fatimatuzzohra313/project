import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO, TechVenture',
    content: 'The team at Xavia Solutions exceeded our expectations. They delivered our e-commerce platform ahead of schedule with all the features we requested and more. The increase in our online sales has been remarkable.',
    rating: 5,
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'CTO, FinTech Innovations',
    content: 'Working with Xavia on our fintech application was a game-changer for our business. Their expertise in security and user experience design resulted in a product our customers love using every day.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Marketing Director, GrowthBrand',
    content: 'The custom CRM solution developed by Xavia Solutions transformed how we manage customer relationships. The team was responsive, professional, and delivered exactly what we needed.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-r from-primary-400/10 to-primary-600/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-gradient-to-r from-accent-400/10 to-accent-600/10 blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Read testimonials from clients who have experienced our exceptional service and solutions.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} fill="#8445ff" color="#8445ff" size={20} />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].position}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-primary-600 dark:text-primary-400" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-primary-600 dark:text-primary-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;