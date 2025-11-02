import React, { useState, useCallback } from 'react';
import Slide from './S2';
// import type { SlideData } from '../types';
// import Slide from './Slide';
// import ChevronLeftIcon from './icons/ChevronLeftIcon';
// import ChevronRightIcon from './icons/ChevronRightIcon';
interface SlideData {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
}


interface SliderProps {
  slides: SlideData[];
  initialIndex?: number;
}

const Slider: React.FC<SliderProps> = ({ slides, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialIndex >= 0 && initialIndex < slides.length) {
      return initialIndex;
    }
    return 0;
  });

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const slideWidthPercentage = 80;
  const gapPercentage = 4;
  const totalSlideSpacePercentage = slideWidthPercentage + gapPercentage;
  const centeringOffsetPercentage = (100 - slideWidthPercentage) / 2;

  const transformX = `translateX(calc(${centeringOffsetPercentage}% - ${currentIndex * totalSlideSpacePercentage}%))`;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform ease-out duration-500 items-center"
          style={{ transform: transformX, gap: `${gapPercentage}%` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-shrink-0" style={{ width: `${slideWidthPercentage}%` }}>
              <Slide
                data={slide}
                isActive={index === currentIndex}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 md:-left-8 transform -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700/80 p-3 rounded-full text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 z-10"
        aria-label="Previous slide"
      >
        {/* <ChevronLeftIcon className="h-6 w-6" /> */}
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 md:-right-8 transform -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700/80 p-3 rounded-full text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 z-10"
        aria-label="Next slide"
      >
        {/* <ChevronRightIcon className="h-6 w-6" /> */}
      </button>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              currentIndex === index ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
