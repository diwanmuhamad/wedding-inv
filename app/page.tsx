"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const titleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
};

// Gallery photos - in a real app, these would come from a CMS or API
const galleryPhotos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    alt: "Sarah and John on beach",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600&auto=format&fit=crop",
    alt: "Sarah and John in park",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1537907510278-a5a2191f146a?q=80&w=600&auto=format&fit=crop",
    alt: "Sarah and John at sunset",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
    alt: "Sarah and John hiking",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=600&auto=format&fit=crop",
    alt: "Sarah and John at dinner",
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Add sparkle effect on click
  const handleClick = (e: React.MouseEvent) => {
    const newSparkle = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setSparkles((prev) => [...prev, newSparkle]);

    // Remove sparkle after animation
    setTimeout(() => {
      setSparkles((prev) =>
        prev.filter((sparkle) => sparkle.id !== newSparkle.id)
      );
    }, 1000);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) =>
      prev === galleryPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? galleryPhotos.length - 1 : prev - 1
    );
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      onClick={handleClick}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Parallax effect based on mouse position */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-lg opacity-50"
          animate={{
            x: mousePosition.x / 30,
            y: mousePosition.y / 30,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-lg opacity-50"
          animate={{
            x: -mousePosition.x / 30,
            y: -mousePosition.y / 30,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: 0.5,
          }}
        />

        {/* Floating hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0, scale: 0 }}
              animate={{
                y: [-20, 0],
                opacity: [0, 1, 0.7],
                scale: [0, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Heart
                className={`w-${Math.floor(Math.random() * 3) + 3} h-${
                  Math.floor(Math.random() * 3) + 3
                } text-pink-${Math.floor(Math.random() * 3) + 3}00 opacity-${
                  Math.floor(Math.random() * 5) + 3
                }0`}
              />
            </motion.div>
          ))}
        </div>

        {/* Glitter effect */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
          />
        ))}

        {/* Click sparkles */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
            className="absolute pointer-events-none z-50"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <Sparkles className="w-8 h-8 text-pink-400" />
          </motion.div>
        ))}
      </motion.div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div variants={contentVariants} className="text-center relative">
          <motion.div variants={titleVariants} className="mb-8 relative">
            <Heart
              data-testid="heart-icon"
              className="w-16 h-16 text-pink-500 mx-auto relative z-10"
            />

            {/* Pulsing circle behind heart */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-pink-200 z-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.h1
            variants={titleVariants}
            className="text-5xl md:text-7xl font-serif text-pink-800 mb-4 font-bold"
          >
            Wedding Invitation
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
          >
            Join us in celebrating our special day
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-1 rounded-full opacity-0 hover:opacity-70 bg-gradient-to-r from-pink-600 to-purple-600 blur-md transition-opacity duration-300"></div>
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Open Invitation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="mt-16 max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-pink-100 relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-10 relative z-10"
              >
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200 to-transparent rounded-bl-full opacity-70"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200 to-transparent rounded-tr-full opacity-70"
                  animate={{
                    rotate: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-serif text-pink-800 mb-6 text-center"
                >
                  Sarah & John
                </motion.h2>

                {/* Photo Gallery Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative overflow-hidden rounded-xl shadow-lg mx-auto max-w-md aspect-[3/2] group cursor-pointer"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <p className="text-white font-medium text-lg">
                      View Gallery
                    </p>
                  </div>
                  <div className="relative h-full">
                    <Image
                      src={galleryPhotos[0].src}
                      alt={galleryPhotos[0].alt}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                </motion.div>

                <div className="space-y-6 text-center">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-700 text-lg"
                  >
                    We are delighted to invite you to our wedding celebration
                  </motion.p>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-300"
                    >
                      <Calendar
                        data-testid="calendar-icon"
                        className="w-5 h-5 text-pink-500"
                      />
                      <p>Saturday, December 31st, 2024</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-300"
                    >
                      <Clock
                        data-testid="clock-icon"
                        className="w-5 h-5 text-pink-500"
                      />
                      <p>4:00 PM</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center justify-center gap-2 text-gray-600 transition-colors duration-300"
                    >
                      <MapPin
                        data-testid="map-pin-icon"
                        className="w-5 h-5 text-pink-500"
                      />
                      <p>123 Wedding Lane, New York, NY 10001</p>
                      <Button
                        onClick={() => setIsMapOpen(true)}
                        variant="ghost"
                        className="text-pink-600 hover:text-pink-700 px-2 py-1 h-auto"
                      >
                        View on map
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="outline"
                      className="mt-4 rounded-full hover:bg-pink-50 transition-colors duration-300 group relative overflow-hidden"
                    >
                      <span className="relative z-10">Close</span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-pink-300 transition-opacity duration-300" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Gallery Modal */}
        <AnimatePresence>
          {isGalleryOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsGalleryOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-4xl aspect-[3/2]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="absolute top-2 right-2 z-20 bg-black/50 rounded-full p-1 cursor-pointer hover:bg-black/70"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsGalleryOpen(false);
                  }}
                >
                  <X className="text-white w-6 h-6" />
                </motion.div>

                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={currentPhotoIndex}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryPhotos[currentPhotoIndex].src}
                      alt={galleryPhotos[currentPhotoIndex].alt}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 1024px"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Navigation arrows */}
                <motion.div
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 cursor-pointer hover:bg-black/70 z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </motion.div>

                <motion.div
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 cursor-pointer hover:bg-black/70 z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPhoto}
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </motion.div>

                {/* Photo counter */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {galleryPhotos.length}
                </div>

                {/* Thumbnail navigation */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
                  {galleryPhotos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      className={`w-10 h-10 rounded-md overflow-hidden cursor-pointer border-2 ${
                        index === currentPhotoIndex
                          ? "border-pink-500"
                          : "border-transparent"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPhotoIndex(index);
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          className="object-cover"
                          fill
                          sizes="40px"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Maps Modal */}
        <AnimatePresence>
          {isMapOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsMapOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-4xl max-h-[80vh] bg-white rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="absolute top-2 right-2 z-20 bg-black/50 rounded-full p-1 cursor-pointer hover:bg-black/70"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMapOpen(false);
                  }}
                >
                  <X className="text-white w-6 h-6" />
                </motion.div>

                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2246782731376!2d-73.98784492394061!3d40.758889971383794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1674338740400!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wedding venue location"
                  ></iframe>
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-xl font-medium text-pink-800 mb-2">
                    Wedding Venue
                  </h3>
                  <p className="text-gray-700">
                    123 Wedding Lane, New York, NY 10001
                  </p>
                  <div className="flex justify-center mt-4 gap-4">
                    <Button
                      onClick={() =>
                        window.open(
                          "https://maps.google.com/?q=Times+Square,+New+York,+NY",
                          "_blank"
                        )
                      }
                      className="bg-pink-600 hover:bg-pink-700 text-white rounded-full"
                    >
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsMapOpen(false)}
                      className="rounded-full"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
