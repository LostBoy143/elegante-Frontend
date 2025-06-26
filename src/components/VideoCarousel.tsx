
import React, { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';

const VideoCarousel = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const reels = [
    {
      id: "dQw4w9WgXcQ",
      title: "Bedazzled Bow Tie Look",
      discount: "81% discount",
      views: "215 Views",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "jNQXAC9IVRw", 
      title: "Bold Sleek Earcuff Style",
      discount: "81% discount",
      views: "277 Views",
      thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "ScMzIvxBSi4",
      title: "Sunset Seductress Vibes",
      discount: "53% discount", 
      views: "57 Views",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Bold Blaze On Earrings",
      discount: "75% discount",
      views: "134 Views", 
      thumbnail: "https://images.unsplash.com/photo-1566479179817-c0a7e82dcd2a?w=400&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: "lAhHNCfA7NI",
      title: "Royal Ruby Drop Set",
      discount: "70% discount",
      views: "163 Views",
      thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % reels.length);
    }, 4000); // Auto rotate every 4 seconds

    return () => clearInterval(interval);
  }, [reels.length]);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-4">
            Trending <span className="italic font-serif text-rose-600">Reels</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Discover the latest fashion trends through our curated video content
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Main Video Display */}
            <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {reels[currentVideo].discount}
                </span>
              </div>

              {/* Video Thumbnail/Player */}
              <div className="relative w-full h-full">
                <img 
                  src={reels[currentVideo].thumbnail}
                  alt={reels[currentVideo].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-20 flex flex-col space-y-4 z-20">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </button>
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300">
                  <Share2 className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={reels[currentVideo].avatar}
                    alt="Creator"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      {reels[currentVideo].title}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {reels[currentVideo].views}
                    </p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex space-x-1">
                  {reels.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentVideo 
                          ? 'bg-white flex-1' 
                          : 'bg-white/30 w-4'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {reels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentVideo 
                      ? 'bg-rose-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg">
            Watch More Reels
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
