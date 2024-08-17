import React, { useEffect, useRef, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieSliderProps {
  category: string;
}

interface ContentItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const formattedContentType = contentType === "movie" ? "Movies" : "Tv Shows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        // Check if res.data.content.results is an array
        if (res.data && Array.isArray(res.data.content.results)) {
          setContent(res.data.content.results);
        } else {
          console.error("Expected content.results to be an array but received:", res.data.content);
          setContent([]);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent([]);
      }
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  return (
    <div
      className='bg-black text-white relative px-5 md:px-20'
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div
        ref={sliderRef}
        className='flex space-x-4 overflow-x-scroll scrollbar-hide'
      >
        {content.length > 0 ? (
          content.map((item) => (
            <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
              <div className='rounded-lg overflow-hidden'>
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt='Movie image'
                  className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                />
              </div>
              <p className='mt-2 text-center'>{item.title || item.name}</p>
            </Link>
          ))
        ) : (
          <p>No content available</p>
        )}
      </div>

      {showArrows && (
        <>
          <button
            className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
