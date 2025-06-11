import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import ChatBot from './ChatBot';
import ClientsSlider from '../components/home/Client';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ClientsSlider/>
      <FeaturedServices />
      <FeaturedProjects />
      {/* <Testimonials /> */}
     
      <CallToAction />
    </>
  );
};

export default HomePage;