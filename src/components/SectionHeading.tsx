
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-wide uppercase relative">
          {title}
          <div className="absolute -right-8 md:-right-12 top-1/2 transform -translate-y-1/2 w-6 md:w-8 h-px bg-gray-400"></div>
        </h2>
      </div>
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
