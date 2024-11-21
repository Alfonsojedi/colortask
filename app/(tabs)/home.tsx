import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Home() {
  return(
  <div>
    <h1>Página de Prueba</h1>
    <Image
      source={require('@/assets/images/JF.png')}
    />
  </div>
  )
}
