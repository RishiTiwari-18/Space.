"use client"

import { Card, CardContent, CardHeader } from './ui/card';
import { CloudRain, Trees, Waves, Wind, CloudLightning, Flame, Bird } from 'lucide-react';
import { useAmbient } from '@/contexts/AmbientContext';

const ambientSoundsData = [
  { name: 'Rain', src: '/audio/rain.mp3', icon: CloudRain, description: 'Relaxing rain sounds for focus and calm.' },
  { name: 'Fire', src: '/audio/fire.mp3', icon: Flame, description: 'Crackling fire ambience for warmth and comfort.' },
  { name: 'Forest', src: '/audio/forest.mp3', icon: Trees, description: 'Forest sounds with rustling leaves and nature.' },
  { name: 'Waves', src: '/audio/waves.mp3', icon: Waves, description: 'Ocean wave sounds for a soothing environment.' },
  { name: 'Thunder', src: '/audio/thunder.mp3', icon: CloudLightning, description: 'Thunderstorm ambience for deep relaxation.' },
  { name: 'River', src: '/audio/river.mp3', icon: Wind, description: 'Flowing river sounds for tranquility.' },
  { name: 'Birds', src: '/audio/birds.mp3', icon: Bird, description: 'Chirping birds for a refreshing morning feel.' },
];

export default function Ambient() {
  const { AmbientSoundItem } = useAmbient();

  return (
    <Card className="w-full" aria-label="Ambient Sounds Card">
      <CardHeader>
        <h2 id="ambient-sounds-title">
          Ambient Sounds
        </h2>
      </CardHeader>
      <CardContent
        className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
        aria-labelledby="ambient-sounds-title"
      >
          {ambientSoundsData.map((sound) => (
            <div key={sound.name} className="list-none" aria-label={`${sound.name} ambient sound`}>
              <AmbientSoundItem sound={sound} />
              <meta itemProp="audio" content={sound.src} />
              <meta itemProp="description" content={sound.description} />
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
