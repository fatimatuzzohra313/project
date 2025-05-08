import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import ChatBot from './ChatBot';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <FeaturedProjects />
      <Testimonials />
      <ChatBot/>
      <CallToAction />
    </>
  );
};

export default HomePage;