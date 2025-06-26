"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button'; // Assuming Button component path
import { Slider } from './ui/slider'; // Assuming Slider component path
import { Play, Volume2, VolumeX, CloudRain, Trees, Waves, Wind, CloudLightning, Flame, Bird, MountainSnow, Square } from 'lucide-react'; 

const ambientSoundsData = [
  { name: 'Rain', src: '/audio/rain.mp3', icon: CloudRain },
  { name: 'Fire', src: '/audio/fire.mp3', icon: Flame },
  { name: 'Forest', src: '/audio/forest.mp3', icon: Trees },
  { name: 'Waves', src: '/audio/waves.mp3', icon: Waves },
  { name: 'Thunder', src: '/audio/thunder.mp3', icon: CloudLightning }, 
  { name: 'River', src: '/audio/river.mp3', icon: Wind },
  { name: 'Birds', src: '/audio/birds.mp3', icon: Bird }, 
];

interface AmbientSoundItemProps {
  sound: typeof ambientSoundsData[0];
}

function AmbientSoundItem({ sound }: AmbientSoundItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Initial volume
  const [prevVolume, setPrevVolume] = useState(0.5); // To store volume before muting
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio(sound.src);
        audioRef.current.loop = true; // Loop the ambient sound
        audioRef.current.volume = volume;
        // Optional: Handle errors
        audioRef.current.onerror = (e) => {
          // const err = audioRef.current?.error;
          // if (err) {
          //   console.error(
          //     `Error loading audio for ${sound.name}: code=${err.code}, message=${err.message || 'No message'}`
          //   );
          // } else {
          //   console.error(`Error loading audio for ${sound.name}:`, e);
          // }
          setIsPlaying(false);
        };
      }

      // Set volume and play
      audioRef.current.volume = volume;
      audioRef.current.play().catch(error => {
        console.error(`Playback failed for ${sound.name}:`, error);
        // Handle cases where play() might fail (e.g., user gesture required)
        // You might want to show a message to the user
      });

    } else {
      // Pause audio element
      if (audioRef.current) {
        audioRef.current.pause();
        // audioRef.current.currentTime = 0; // Optional: reset to start
      }
    }

    // Cleanup function: pause and release the audio resource when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // Release the audio resource
        audioRef.current = null;
      }
    };
  }, [isPlaying, sound.src]); // Re-run effect if isPlaying or src changes

  // Effect to update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (vol > 0) {
      setPrevVolume(vol); // Store non-zero volume
    }
  };

  const handleMuteToggle = () => {
    if (volume > 0) {
      setPrevVolume(volume); // Store current volume before muting
      setVolume(0);
    } else {
      // Restore previous volume, default to 0.5 if prev was 0 or not set
      setVolume(prevVolume > 0 ? prevVolume : 0.5);
    }
  };


  const Icon = sound.icon; // Get the icon component

  return (
    <div className="flex items-center bg-black/5 justify-between p-3 border rounded-md">
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span>{sound.name}</span>
      </div>
      <div>
        {!isPlaying ? (
          <Button variant="outline" size="icon" onClick={handlePlayToggle} aria-label={`Play ${sound.name}`}>
            <Play size={20} />
          </Button>
        ) : (
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="icon" onClick={handleMuteToggle} aria-label={volume === 0 ? "Unmute" : "Mute"}>
                {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
             </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-[100px]"
            />
            <Button variant="outline" size="icon" onClick={() => setIsPlaying(false)} aria-label={`Stop ${sound.name}`}>
               <Square size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


export default function Ambient() {
  return (
    <Card className='w-full'>
        <CardHeader>Ambient Sounds</CardHeader> {/* Corrected typo */}
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"> {/* Added padding/gap */}
            {ambientSoundsData.map((sound) => (
                <AmbientSoundItem key={sound.name} sound={sound} />
            ))}
        </CardContent>
    </Card>
  );
}
