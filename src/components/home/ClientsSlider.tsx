import React, { useEffect, useRef } from 'react';

interface Client {
  id: number;
  name: string;
  logo: string;
}

const clients: Client[] = [
  { id: 1, name: 'Client A', logo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Client+A' },
  { id: 2, name: 'Client B', logo: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Client+B' },
  { id: 3, name: 'Client C', logo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Client+C' },
  { id: 4, name: 'Client D', logo: 'https://via.placeholder.com/150/FFFF00/000000?text=Client+D' },
  { id: 5, name: 'Client E', logo: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Client+E' },
  { id: 6, name: 'Client F', logo: 'https://via.placeholder.com/150/00FFFF/000000?text=Client+F' },
  // Add more clients as needed
];

const ClientsSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let scrollAmount = 0;

    const animateScroll = () => {
      scrollAmount += 0.5; // Adjust scroll speed here
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0; // Reset scroll to create infinite loop
      }
      slider.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Our Valued Clients
        </h2>
        <div
          ref={sliderRef}
          className="flex overflow-x-hidden space-x-8 py-4"
          style={{
            /* Custom CSS for smooth scrolling and infinite loop */
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          {/* Duplicate clients to create an infinite scroll effect */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 w-48 flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 mb-2"
              />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSlider;