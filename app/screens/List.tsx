import {Text, View, StyleSheet, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { Colores } from '@/constants/Colores';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation} : RouterProps) => {
    return(
        <View style={styles.container}>
            <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 40}}>Bienvenido</Text>
            <View style={{marginBottom: 5}}>
                <Button title='Abrir tareas' color={Colores.light.secondary} onPress={() => navigation.navigate('Tasks')}></Button>
            </View>
            <View style={{marginBottom: 5}}>
                <Button title='Añadir tareas' color={Colores.light.secondary} onPress={() => navigation.navigate('Add')}></Button>
            </View>
            <View style={{marginBottom: 5}}>
                <Button title='Cerrar sesión' color={Colores.light.secondary} onPress={() => fire_auth.signOut()}></Button>
            </View>
        </View>
    )
}

export default List;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colores.light.background,
    },
});