import {Text, View, Image, StyleSheet, Button } from 'react-native';
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
            <View style={styles.border}>
            <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 10}}>Colortask</Text>
                <Image source={require('@/assets/images/logo.png')}></Image>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 5}}>Bienvenido a Colortask</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>¿A dónde desea ir?</Text>
                <View style={{marginBottom: 5}}>
                    <Button title='Abrir tareas' color={Colores.light.success} onPress={() => navigation.navigate('Tasks')}></Button>
                </View>
                <View style={{marginBottom: 5}}>
                    <Button title='Añadir/Editar tareas' color={Colores.light.success} onPress={() => navigation.navigate('Add')}></Button>
                </View>
                <View style={{marginBottom: 5}}>
                    <Button title='Cerrar sesión' color={Colores.light.danger} onPress={() => fire_auth.signOut()}></Button>
                </View>
            </View>
        </View>
    )
}

export default List;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colores.light.background,
    },
    border: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colores.light.outline,
        backgroundColor: Colores.light.secondary,
        marginTop: 30,
        marginBottom: 30,
        padding: 10,
    }
});