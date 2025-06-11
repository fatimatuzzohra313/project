import React, { useEffect, useRef } from 'react';

// Import logos (ensure these paths are correct for your project structure)
import squicleLogo from '../../assets/logos/Squicle-main.png';
import kolabryaLogo from '../../assets/logos/kolabrya-logo.jpeg';
import mbitesLogo from '../../assets/logos/mbites-logo.png';
import onestopLogo from '../../assets/logos/onestop-logo.png';
import playlyneLogo from '../../assets/logos/playlyne-logo.png';
import caloLogo from '../../assets/logos/calo-logo.jpg';
import airifyLogo from '../../assets/logos/Airify-Logo.png';
import caaryLogo from '../../assets/logos/caary-logo.png';
import infinityLogo from '../../assets/logos/Caary-Purple.png';
import tilismLogo from '../../assets/logos/tilism.png';
import doorPharmacyLogo from '../../assets/logos/doorpharmacy.png';
import accustoreLogo from '../../assets/logos/accustore_logo.jpeg';
import digicardLogo from '../../assets/logos/digicard-logo-1.png';
import hadiLearningLogo from '../../assets/logos/hadilearning-logo.png';
import justHussainLogo from '../../assets/logos/justhussain-logo-1.png';
import metagoLogo from '../../assets/logos/metago-logo.jpg';
import unileverLogo from '../../assets/logos/unilever.png';
import multilink from '../../assets/logos/multilink.png';
import governerLogo from '../../assets/logos/governersindh.png';
import zaprazLogo from '../../assets/logos/zapraz.png';
import markematics from '../../assets/logos/markematics.png';
import interllexalSolution from "../../assets/logos/intellexalSolutions.png";
import gskLogo from "../../assets/logos/gsk.png";
import { useTheme } from '../../context/ThemeContext';

// Define the Client interface
interface Client {
  id: number;
  name: string;
  logo: string;
  hasInvertedBg?: boolean;
}

// Client data with the hasInvertedBg flag
const clients: Client[] = [
  { id: 8, name: 'Caary', logo: infinityLogo, hasInvertedBg: false },
  { id: 24, name: 'GSK', logo: gskLogo, hasInvertedBg: false },
  { id: 6, name: 'CALO', logo: caloLogo },
  { id: 15, name: 'MultiLink Enterprises', logo: multilink, hasInvertedBg: true },
  { id: 10, name: 'AccuStore', logo: accustoreLogo },
  { id: 16, name: 'Door Pharmacy', logo: doorPharmacyLogo, hasInvertedBg: true },
  { id: 12, name: 'Hadi E-Learning', logo: hadiLearningLogo },
  { id: 19, name: 'Unilever', logo: unileverLogo, hasInvertedBg: true },
  { id: 13, name: 'Just Hussain', logo: justHussainLogo },
  { id: 20, name: 'Zapraz', logo: zaprazLogo, hasInvertedBg: true },
  { id: 14, name: 'Metago', logo: metagoLogo },
  { id: 23, name: 'Intellexal Solutions', logo: interllexalSolution, hasInvertedBg: true },
  { id: 1, name: 'Squicle', logo: squicleLogo, hasInvertedBg: false },
  { id: 7, name: 'Airify', logo: airifyLogo, hasInvertedBg: false },
  { id: 11, name: 'DigiCard', logo: digicardLogo, hasInvertedBg: false },
  { id: 17, name: 'Tilism', logo: tilismLogo, hasInvertedBg: false },
  { id: 2, name: 'Kolabrya', logo: kolabryaLogo },
  { id: 3, name: 'MBites', logo: mbitesLogo },
  { id: 4, name: 'OneStop', logo: onestopLogo },
  { id: 5, name: 'Playlyne', logo: playlyneLogo },
  { id: 18, name: 'Governer Sindh', logo: governerLogo },
  { id: 22, name: 'Markematics', logo: markematics },
];

const ClientsSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const {theme} = useTheme();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animateScroll = () => {
      if (!isPausedRef.current) {
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += 0.5;
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(animateScroll);
    };

    const handleMouseEnter = () => { isPausedRef.current = true; };
    const handleMouseLeave = () => {
      isPausedRef.current = false;
      isDraggingRef.current = false;
      slider.classList.remove('active-drag');
    };
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.pageX - slider.offsetLeft;
      startScrollLeftRef.current = slider.scrollLeft;
      slider.classList.add('active-drag');
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      slider.scrollLeft = startScrollLeftRef.current - walk;
    };
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      slider.classList.remove('active-drag');
    };

    animationFrameIdRef.current = requestAnimationFrame(animateScroll);

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleArrowClick = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;

    isPausedRef.current = true;
    setTimeout(() => { isPausedRef.current = false; }, 2000);

    const scrollAmount = slider.clientWidth / 2;
    slider.scrollTo({
      left: slider.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-5 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Our Valued Clients
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden py-6 cursor-grab active-drag:cursor-grabbing"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              scrollbarWidth: 'none',
            }}
          >
            {[...clients, ...clients].map((client, index) => {
              // Determine the background classes based on hasInvertedBg
              const logoBgClasses = client.hasInvertedBg
                ? ' bg-gray-800 border border-white shadow-md' // Inverted background for these logos

                : 'bg-white shadow-md'; // Default background

              // Determine text color based on hasInvertedBg for better contrast
              const textColorClasses = theme === 'light' ? 
                 'text-black' // Light text for inverted background
                : 'text-white'; // Default text color

              return (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 mx-4 w-32 flex flex-col items-center justify-center p-3 rounded-lg
                             transition-all duration-300 hover:!scale-110 hover:shadow-xl
                             bg-white dark:bg-gray-800
                             shadow-lg dark:shadow-black/80
                             border border-gray-300 dark:border-white/10"
                  onDragStart={(e) => e.preventDefault()}
                >
                  <div
                    className={`h-20 w-20 rounded-full flex items-center justify-center p-1 mb-3
                                 transition-all duration-500 hover:rotate-12 shadow-inner ${logoBgClasses}`}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-14 w-14 object-contain rounded-full transition-all duration-300 hover:scale-105 pointer-events-none"
                      style={{ padding: '2px' }}
                    />
                  </div>
                  <span className={`text-xs text-center ${textColorClasses}`}>{client.name}</span>
                </div>
              );
            })}
          </div>

          {/* Optional: Add arrows if desired */}
          <button
            onClick={() => handleArrowClick('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 shadow p-2 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={() => handleArrowClick('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 shadow p-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientsSlider;