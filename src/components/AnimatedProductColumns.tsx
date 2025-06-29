import React from "react";

const AnimatedProductColumns = () => {
  // Define your images for each column
  let products = [
    [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      "https://plus.unsplash.com/premium_photo-1676236306466-25ba882070b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1642447411662-59ab77473a8d?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1677947226918-7c783095d780?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1631233999975-3d559f0526e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://plus.unsplash.com/premium_photo-1674069718653-ce98c196ff6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
    ],
    [
      "https://images.unsplash.com/photo-1674000048489-cf976d2ceef1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyb3AlMjB0b3BzfGVufDB8fDB8fHww?w=300&h=400&fit=crop",
      "https://plus.unsplash.com/premium_photo-1691622500412-151f9c315b4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNyb3AlMjB0b3BzfGVufDB8fDB8fHww?w=300&h=400&fit=crop",
      "https://plus.unsplash.com/premium_photo-1689371957665-b9d6a135edc9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JvcCUyMHRvcHN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEplYW5zfGVufDB8fDB8fHww?w=300&h=400&fit=crop",
      "https://plus.unsplash.com/premium_photo-1673757119677-6445b73a405e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D?w=300&h=400&fit=crop",
      "https://plus.unsplash.com/premium_photo-1667161529094-16ba30fa00a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2hvZXMlMjBmb3IlMjBnaXJsc3xlbnwwfHwwfHx8MA%3D%3D?w=300&h=400&fit=crop",
    ],
    [
      "https://images.unsplash.com/photo-1633077705107-8f53a004218f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565033434504-737427e97bdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEhvdCUyMGRyZXNzZXN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SmVhbnN8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1608539733292-190446b22b83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518026620598-11e8ca5662c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3V0ZXJ3ZWFycyUyMGdpcmxzfGVufDB8fDB8fHww?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1748851261836-a1d38a2d6d49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9uZSUyMHBpZWNlJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D?w=300&h=400&fit=crop",
    ],
  ];

  // Normalize all columns to the same length for perfect sync
  const minLength = Math.min(
    products[0].length,
    products[1].length,
    products[2].length
  );
  products = products.map((col) => col.slice(0, minLength));

  return (
    <section className="py-8 md:py-12 bg-rose-50/30 overflow-hidden">
      {/* CSS Custom Animations */}
      <style>
        {`
          @keyframes scrollDown {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          
          @keyframes scrollUp {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          
          .scroll-down {
            animation: scrollDown 10s linear infinite;
          }
          
          .scroll-up {
            animation: scrollUp 10s linear infinite;
          }
        `}
      </style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
            Featured Gallery
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto text-sm md:text-base">
            Explore our curated selection of premium pieces
          </p>
        </div>

        <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] flex gap-2 md:gap-4 justify-center max-w-6xl mx-auto">
          {/* Column 1 - Scrolling Down */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-[32%]">
            <div
              className="scroll-down flex flex-col gap-2 md:gap-3"
              style={{ height: "200%" }}
            >
              {[...products[0], ...products[0]].map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Scrolling Up (opposite direction) */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-[32%]">
            <div
              className="scroll-up flex flex-col gap-2 md:gap-3"
              style={{ height: "200%" }}
            >
              {[...products[1], ...products[1]].map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Scrolling Down */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-[32%]">
            <div
              className="scroll-down flex flex-col gap-2 md:gap-3"
              style={{ height: "200%" }}
            >
              {[...products[2], ...products[2]].map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optional: Uncomment if you want the explore button */}
        {/* <div className="text-center mt-6 md:mt-8">
          <button className="bg-gray-900 text-white px-8 py-3 md:py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all duration-300">
            Explore More Products
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default AnimatedProductColumns;
