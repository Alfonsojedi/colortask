import {View, StyleSheet, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation} : RouterProps) => {
    return(
        <View style={styles.container}>
            <Button title='Abrir tareas' color={styles.button.color} onPress={() => navigation.navigate('Tasks')}></Button>
            <Button title='Cerrar sesión' color={styles.button.color} onPress={() => fire_auth.signOut()}></Button>
        </View>
    )
}

export default List;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
        color: '#f84',
    }
  });