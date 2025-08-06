"use client"

import { Card, CardContent, CardHeader } from './ui/card';
import {  CloudRain, Trees, Waves, Wind, CloudLightning, Flame, Bird} from 'lucide-react'; 
import { useAmbient } from '@/contexts/AmbientContext';

const ambientSoundsData = [
  { name: 'Rain', src: '/audio/rain.mp3', icon: CloudRain },
  { name: 'Fire', src: '/audio/fire.mp3', icon: Flame },
  { name: 'Forest', src: '/audio/forest.mp3', icon: Trees },
  { name: 'Waves', src: '/audio/waves.mp3', icon: Waves },
  { name: 'Thunder', src: '/audio/thunder.mp3', icon: CloudLightning }, 
  { name: 'River', src: '/audio/river.mp3', icon: Wind },
  { name: 'Birds', src: '/audio/birds.mp3', icon: Bird }, 
];


export default function Ambient() {

  const {
    AmbientSoundItem
  } = useAmbient();
  return (
    <Card className='w-full'>
        <CardHeader>Ambient Sounds</CardHeader> 
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {ambientSoundsData.map((sound) => (
                <AmbientSoundItem key={sound.name} sound={sound} />
            ))}
        </CardContent>
    </Card>
  );
}
