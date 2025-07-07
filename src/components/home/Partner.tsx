import React from 'react';

// If you use a theme, keep this import.
import { useTheme } from '../../context/ThemeContext';

// Import your partner logos (make sure the paths are correct)
import partnerLogo1 from '../../assets/logos/odoLogo.png';
import partnerLogo2 from '../../assets/logos/tilism.png';
import partnerLogo3 from '../../assets/logos/jazz-logo.png';

// Define the Partner interface
interface Partner {
  id: number;
  name: string;
  logo: string;
  needsWhiteBg?: boolean; // Use this for logos that look best on a white background
}

// Your partner data, with a flag for Odoo
const partners: Partner[] = [
  { id: 2, name: 'Tilism', logo: partnerLogo2 },
  { id: 1, name: 'Odoo', logo: partnerLogo1, needsWhiteBg: true },
  { id: 3, name: 'Jazz', logo: partnerLogo3 },
];

const PartnersSection: React.FC = () => {
  const { theme } = useTheme(); // Use theme for text color

  return (
    // Changed to a darker slate for better contrast with cards
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Our Trusted Partners
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => {
            // New logic for better background contrast in dark mode
            const logoBgClasses = partner.needsWhiteBg
              ? 'bg-white' // Force a white background for specific logos like Odoo
              : 'bg-gray-100 dark:bg-slate-700'; // Default: light gray for light mode, slate for dark

            // Adjusted text color for better readability
            const textColorClasses = theme === 'light' ? 'text-gray-600' : 'text-slate-300';

            return (
              <div
                key={partner.id}
                className="flex-shrink-0 w-48 shadow-lg flex flex-col items-center justify-center p-6 rounded-xl
                           transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2
                           bg-gray-50 dark:bg-slate-800
                           border border-gray-200 dark:border-slate-700"
              >
                <div
                  className={`h-24 w-24 rounded-full flex items-center justify-center p-2 mb-4
                              transition-all duration-500 shadow-inner ${logoBgClasses}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-16 object-contain transition-all duration-300 pointer-events-none"
                  />
                </div>
                <span className={`text-sm font-semibold text-center ${textColorClasses}`}>
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;