
"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Square } from "lucide-react";

type AmbientSound = {
  name: string;
  src: string;
  icon: React.ComponentType<{ size?: number }>;
};

type AmbientSoundState = {
  isPlaying: boolean;
  volume: number;
  prevVolume: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

type AmbientSoundItemProps = {
  sound: AmbientSound;
};

type AmbientContextType = {
  AmbientSoundItem: React.FC<AmbientSoundItemProps>;
};

const AmbientContext = createContext<AmbientContextType>({ AmbientSoundItem: () => null });

export const AmbientProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundStates, setSoundStates] = useState<Record<string, AmbientSoundState>>({});

  const ensureSoundState = useCallback((sound: AmbientSound) => {
    setSoundStates((prev) => {
      if (prev[sound.name]) return prev;
      const audioRef = React.createRef<HTMLAudioElement>() as React.MutableRefObject<HTMLAudioElement | null>;
      return {
        ...prev,
        [sound.name]: {
          isPlaying: false,
          volume: 0.5,
          prevVolume: 0.5,
          audioRef,
        },
      };
    });
  }, []);

  const AmbientSoundItem: React.FC<AmbientSoundItemProps> = ({ sound }) => {
    useEffect(() => {
      ensureSoundState(sound);
    }, [sound, ensureSoundState]);

    const state = soundStates[sound.name];
    if (!state) return null;

    const { isPlaying, volume, prevVolume, audioRef } = state;

    // Local volume state for smooth dragging without re-rendering global context
    const [localVolume, setLocalVolume] = useState(volume);

    // Keep local volume in sync if global volume changes externally
    useEffect(() => {
      setLocalVolume(volume);
    }, [volume]);

    useEffect(() => {
      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio(sound.src);
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;
        audio.onerror = () => {
          setSoundStates((prev) => ({
            ...prev,
            [sound.name]: { ...prev[sound.name], isPlaying: false },
          }));
        };
      }
      if (isPlaying) {
        audio.volume = volume;
        audio.play().catch((e) => {
          console.error(`Playback failed for ${sound.name}:`, e);
        });
      } else {
        audio.pause();
      }
    }, [isPlaying, sound.src]); 

    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = volume;
      }
    }, [volume, audioRef]);

    const handlePlayToggle = () => {
      setSoundStates((prev) => ({
        ...prev,
        [sound.name]: { ...prev[sound.name], isPlaying: !prev[sound.name].isPlaying },
      }));
    };

    const handleVolumeChange = (newVolume: number[]) => {
      const vol = newVolume[0];
      setLocalVolume(vol);
      const audio = audioRef.current;
      if (audio) {
        audio.volume = vol;
      }
    };

    const handleVolumeCommit = (finalVolume: number[]) => {
      const vol = finalVolume[0];
      setSoundStates((prev) => ({
        ...prev,
        [sound.name]: {
          ...prev[sound.name],
          volume: vol,
          prevVolume: vol > 0 ? vol : prev[sound.name].prevVolume,
        },
      }));
    };

    const handleStop = () => {
      setSoundStates((prev) => ({
        ...prev,
        [sound.name]: { ...prev[sound.name], isPlaying: false },
      }));
    };

    const Icon = sound.icon;

    return (
      <div
        className="flex items-center bg-black/5 justify-between p-3 border rounded-md"
        itemScope
        itemType="https://schema.org/AudioObject"
        aria-label={`${sound.name} ambient sound controls`}
      >
        <meta itemProp="name" content={sound.name} />
        <meta itemProp="encodingFormat" content="audio/mpeg" />
        <meta itemProp="url" content={sound.src} />
        <meta itemProp="inLanguage" content="en" />
        <div className="flex items-center gap-3">
          <span aria-hidden="true">
            <Icon size={20} />
          </span>
          <span className="max-md:hidden" itemProp="name">
            {sound.name}
          </span>
        </div>
        <div>
          {!isPlaying ? (
            <Button
              variant="outline"
              size="icon"
              onClick={handlePlayToggle}
              aria-label={`Play ${sound.name} ambient sound`}
              title={`Play ${sound.name} ambient sound`}
              itemProp="potentialAction"
              itemScope
              itemType="https://schema.org/PlayAction"
            >
              <Play size={20} />
              <meta itemProp="target" content={sound.src} />
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Slider
                value={[localVolume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                onValueCommit={handleVolumeCommit}
                className="w-[100px]"
                aria-label={`${sound.name} volume`}
                title={`${sound.name} volume`}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleStop}
                aria-label={`Stop ${sound.name} ambient sound`}
                title={`Stop ${sound.name} ambient sound`}
                itemProp="potentialAction"
                itemScope
                itemType="https://schema.org/StopAction"
              >
                <Square size={20} />
                <meta itemProp="target" content={sound.src} />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AmbientContext.Provider value={{ AmbientSoundItem }}>
      {children}
    </AmbientContext.Provider>
  );
};

export const useAmbient = () => useContext(AmbientContext);
