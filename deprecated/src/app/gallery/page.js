"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const galleryImages = [
      {
    src: "/images/gallery/lionsgate.jpg",
    location: "Vancouver - Lion's Gate, Canada", 
    date: "July 10, 2025", 
  }, 
    {
    src: "/images/gallery/ferns.jpg",
    location: "Vancouver - Battery Park, Canada", 
    date: "July 10, 2025", 
  }, 
  {
    src: "/images/gallery/van1.jpg",
    location: "Vancouver - Battery Park, Canada", 
    date: "July 10, 2025", 
  }, 
  {
    src: "/images/gallery/sf3.jpg",
    location: "San Francisco - Bay Area, USA", 
    date: "July 08, 2025", 
  }, 
  {
    src: "/images/gallery/pelican.jpg",
    location: "San Francisco - Fisherman's Wharf, USA", 
    date: "July 08, 2025", 
  }, 
    {
    src: "/images/gallery/wharf.jpg",
    location: "San Francisco - Fisherman's Wharf, USA", 
    date: "July 08, 2025", 
  }, 
  {
    src: "/images/gallery/sealion.jpg",
    location: "San Francisco - Fisherman's Wharf, USA", 
    date: "July 08, 2025", 
  }, 
  {
    src: "/images/gallery/alcatraz.jpg",
    location: "San Francisco - Bay Area, USA", 
    date: "July 07, 2025", 
  }, 
    {
    src: "/images/gallery/sunnyalcatraz.jpg",
    location: "San Francisco - Bay Area, USA", 
    date: "July 07, 2025", 
  },   
  {
    src: "/images/gallery/sf1.jpg",
    location: "San Francisco, California", 
    date: "July 07, 2025", 
  }, 
    {
    src: "/images/gallery/sf2.jpg",
    location: "San Francisco, California", 
    date: "July 07, 2025", 
  }, 
      {
    src: "/images/gallery/sfpark.jpg",
    location: "San Francisco, California", 
    date: "July 07, 2025", 
  }, 
  {
    src: "/images/gallery/sfbay.jpg",
    location: "San Francisco, California", 
    date: "July 07, 2025", 
  }, 
  {
    src: "/images/gallery/hawk.jpg",
    location: "Calgary - Alberta, Canada", 
    date: "July 07, 2025", 
  }, 

  {
    src: "/images/gallery/airplane.jpg",
    location: "Somewhere near the pacific", 
    date: "July 07, 2025", 
  },
  {
    src: "/images/gallery/caldt.jpg",
    location: "Calgary - Alberta, Canada", 
    date: "July 06, 2025", 
  }, 
    {
    src: "/images/gallery/peacebridge.jpg",
    location: "Calgary - Alberta, Canada", 
    date: "July 06, 2025", 
  }, 
    {
    src: "/images/gallery/skylinecal.jpg",
    location: "Calgary - Alberta, Canada", 
    date: "July 06, 2025", 
  },
      {
    src: "/images/gallery/tower.jpg",
    location: "Calgary - Alberta, Canada", 
    date: "July 06, 2025", 
  },
      {
    src: "/images/gallery/skylinecal2.jpg",
    location: "Calgary - Alberta, Canada", 
    date: "July 06, 2025", 
  },
  {
    src: "/images/gallery/london.jpg",
    location: "London, England",
    date: "August 31, 2024",
  },
  {
    src: "/images/gallery/scotland.jpg",
    location: "Edinbrugh, Scotland",
    date: "September 15, 2024",
  },
  {
    src: "/images/gallery/scotlandstreet1.jpg",
    location: "Edinbrugh, Scotland",
    date: "September 15, 2024",
  },
  {
    src: "/images/gallery/cow.jpg",
    location: "The Highlands, Scotland",
    date: "October 1, 2024",
  },  
  {
    src: "/images/gallery/bambrugh.jpg",
    location: "Bambrugh, Scotland",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/eiffel.jpg",
    location: "Paris, France",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/fountain.jpg",
    location: "Versailles, France",
    date: "October 1, 2024",
  },
   {
    src: "/images/gallery/arch.jpg",
    location: "Paris, France",
    date: "October 1, 2024",
  },{
    src: "/images/gallery/oldwoman.jpg",
    location: "Old Woman Bay, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/seal.jpg",
    location: "Sleeping Giant, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/cherry.jpg",
    location: "Toronto, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/niagara.jpg",
    location: "Niagara Falls, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/flatiron.jpg",
    location: "Toronto, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/fallmoose.jpg",
    location: "Algonquin, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/waterfall.jpg",
    location: "Kawartha Lakes, Canada",
    date: "October 1, 2024",
  },
  {
    src: "/images/gallery/toronto.jpg",
    location: "Toronto, Canada",
    date: "October 1, 2024",
  },
];

const controlBarIcons = [
  { label: "Home", icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L10 4l7 5.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/></svg>
  ), href: "/" },
  { label: "Gallery", icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>
  ), href: "/gallery" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Toggle no-scroll class on body
  useEffect(() => {
    if (isViewerOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isViewerOpen]);

  // Show menu after delay
  useEffect(() => {
    setTimeout(() => setShowMenu(true), 1600);
  }, []);

  const openImageViewer = (image) => {
    console.log('Image clicked:', image);
    setSelectedImage(image);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setIsViewerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#111] text-white py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 font-sans">Gallery</h1>
      <h2 className="text-xl text-gray-300 font-normal mb-8 font-sans">Some of my favourite photos I've taken throughout the years :)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer" onClick={() => openImageViewer(image)}>
            <div className="w-full aspect-video">
              <Image
                src={image.src}
                alt={`Gallery Image ${index + 1}`}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
              <div className="flex items-center text-sm text-gray-200 mb-1">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="10" r="3"/><path d="M12 2s-8 7-8 12.5C4 17.33 5.67 21 12 21s8-3.67 8-6.5C20 9 12 2 12 2z"/></svg>
                <span>{image.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-200">
                 <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span>{image.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Control Bar */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#18181b]/60 border border-[#232323] rounded-xl px-6 py-2 flex gap-6 shadow-lg z-50 backdrop-blur-sm transition-opacity duration-700 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
        {controlBarIcons.map((item, i) => (
          <a key={i} href={item.href} className="p-2 hover:bg-[#232323] rounded-lg transition" aria-label={item.label}>
            {item.icon}
          </a>
        ))}
      </div>

      {/* Image Viewer */}
      {isViewerOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
          <Image
            src={selectedImage.src}
            alt={`Full size of ${selectedImage.location}`}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-xl"
          />
          <div className="absolute bottom-4 left-4 text-white z-50">
            <div className="flex items-center text-sm mb-1">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="10" r="3"/><path d="M12 2s-8 7-8 12.5C4 17.33 5.67 21 12 21s8-3.67 8-6.5C20 9 12 2 12 2z"/></svg>
              <span>{selectedImage.location}</span>
            </div>
            <div className="flex items-center text-sm">
               <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <span>{selectedImage.date}</span>
            </div>
          </div>
          <button onClick={closeImageViewer} className="absolute top-4 right-4 text-white text-2xl font-bold z-50">
            &times;
          </button>
        </div>
      )}
    </div>
  );
} 