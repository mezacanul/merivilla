import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';

const BlogRecommendations = ({ recommendations = [], onRecommendationClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < recommendations.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (recommendations.length === 0) {
    return <div>No recommendations available.</div>;
  }

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold mb-4">More Blog Recommendations</h2>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
        >
          {recommendations.map((blog) => (
            <div key={blog.id} className="w-1/3 flex-shrink-0 px-2">
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[380px]">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-44 object-cover" />
                <div className="p-4 flex flex-col h-[212px]">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-grow">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">{blog.description}</p>
                  <p className="text-xs text-gray-500 mb-2">By {blog.author}</p>
                  <Button 
                    className="w-full mt-auto" 
                    size="sm"
                    onClick={() => onRecommendationClick(blog.id)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={handleNext}
          disabled={currentIndex >= recommendations.length - 3}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BlogRecommendations;