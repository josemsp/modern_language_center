import React, { useState } from 'react';

 interface SlideData {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
}
interface SlideProps {
  data: SlideData;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`transition-all duration-500 ease-out transform ${isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-90'}`}>
      <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full aspect-video object-cover"
        />
        <div className="p-6 md:p-8 flex flex-col">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">{data.category}</span>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mt-2">{data.title}</h3>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">{data.shortDescription}</p>

          <div
            className={`transition-all duration-700 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-400 text-base leading-relaxed">{data.longDescription}</p>
          </div>
          
          <div className="mt-auto pt-6">
            <button
              onClick={toggleExpand}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200"
            >
              {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;