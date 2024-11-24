import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Task(){
    const [items, setItems] = useState('');
    return(
        <View style={styles.container}>
            <View style={styles.container}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    tasks: {

    }
  });