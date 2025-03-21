"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  audioSrc?: string;
}

export function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use a default external music source if none is provided
  const musicSource =
    audioSrc || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // Initialize audio on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isLoaded && audioRef.current) {
        setIsLoaded(true);
        audioRef.current.volume = 0.3; // Set initial volume
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [isLoaded]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio
        ref={audioRef}
        src={musicSource}
        loop
        preload="auto"
        className="hidden"
      />
      <button
        onClick={togglePlay}
        className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-pink-50 transition-colors group"
        aria-label={
          isPlaying ? "Mute background music" : "Play background music"
        }
      >
        <div className="relative">
          {isPlaying ? (
            <>
              <Volume2 className="w-5 h-5 text-pink-600" />
              <div className="absolute -top-1 -right-1 -left-1 -bottom-1 rounded-full border-2 border-pink-300 animate-ping opacity-75"></div>
            </>
          ) : (
            <VolumeX className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>
    </div>
  );
}
