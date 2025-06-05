import React, { useEffect, useRef } from 'react';

// Import logos
import squicleLogo from '../../assets/logos/Squicle-main.png';
import kolabryaLogo from '../../assets/logos/kolabrya-logo.jpeg';
import mbitesLogo from '../../assets/logos/mbites-logo.png';
import onestopLogo from '../../assets/logos/onestop-logo.png';
import playlyneLogo from '../../assets/logos/playlyne-logo.png';
import caloLogo from '../../assets/logos/calo-logo.jpg';
import airifyLogo from '../../assets/logos/Airify-Logo.png';
import caaryLogo from '../../assets/logos/caary-logo.png';
import infinityLogo from '../../assets/logos/Caary-Purple.png';
// New logo imports
import accustoreLogo from '../../assets/logos/accustore_logo.jpeg';
import digicardLogo from '../../assets/logos/digicard-logo-1.png';
import hadiLearningLogo from '../../assets/logos/hadilearning-logo.png';
import justHussainLogo from '../../assets/logos/justhussain-logo-1.png';
import metagoLogo from '../../assets/logos/metago-logo.jpg';

interface Client {
  id: number;
  name: string;
  logo: string;
}

const clients: Client[] = [
  { id: 1, name: 'Squicle', logo: squicleLogo },
  { id: 2, name: 'Kolabrya', logo: kolabryaLogo },
  { id: 3, name: 'MBites', logo: mbitesLogo },
  { id: 4, name: 'OneStop', logo: onestopLogo },
  { id: 5, name: 'Playlyne', logo: playlyneLogo },
  { id: 6, name: 'CALO', logo: caloLogo },
  { id: 7, name: 'Airify', logo: airifyLogo },
  { id: 8, name: 'Caary', logo: caaryLogo },
  { id: 9, name: 'Infinity', logo: infinityLogo },
  // New clients
  { id: 10, name: 'AccuStore', logo: accustoreLogo },
  { id: 11, name: 'DigiCard', logo: digicardLogo },
  { id: 12, name: 'Hadi Learning', logo: hadiLearningLogo },
  { id: 13, name: 'Just Hussain', logo: justHussainLogo },
  { id: 14, name: 'Metago', logo: metagoLogo },
];

const ClientsSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let scrollAmount = 0;

    const animateScroll = () => {
      scrollAmount += 0.2; // Slower scroll speed for smoother animation
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
    <section className="py-5 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          Our Valued Clients
        </h2>
        <div className="max-w-5xl mx-auto">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden py-6"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {/* Duplicate clients to create an infinite scroll effect */}
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 mx-3 w-28 flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-500 hover:scale-110 hover:shadow-xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/20 border border-gray-200 dark:border-gray-700"
              >
                <div 
                  className="h-20 w-20 rounded-full flex items-center justify-center p-1 mb-3 transition-transform duration-500 hover:rotate-12 bg-gray-100 dark:bg-gray-700 shadow-inner"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-14 w-14 object-contain rounded-full transition-all duration-300 hover:scale-110"
                    style={{ padding: '2px' }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center transition-colors duration-300">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSlider;