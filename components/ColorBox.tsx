import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Boxer = (color) => {
    return ({
        borderRadius: 5,
        backgroundColor: color,
        borderColor: '#0008',
        borderWidth: 3,
        flexDirection: 'row',
        width: 20,
        height: 20,
        marginRight: 5,
    })
}

export default function ColorBox({colores}){
    return(
        <View style={{flex:1, flexDirection: 'row'}}>
        {colores.map(color => (
            <View style={Boxer(color)}></View>
        ))}
        </View>
    )
}