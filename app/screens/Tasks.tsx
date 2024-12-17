import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { Colores } from '@/constants/Colores';
import Task from '@/components/Task';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const Tasks = ({navigation} : RouterProps) => {
    return(
        <View style={styles.container}>
            <View style={styles.tasksPage}>
                <View style={styles.profile}>
                    <View>
                        <Text style={styles.headTitle}>Lista de tareas</Text>
                        <Text style={styles.headText}>Tareas a completar</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image source={require('@/assets/images/bell.svg')}></Image>
                </TouchableOpacity>
            </View>
            <Task></Task>
            <View style={styles.cerrar}>
                <Button title='Cerrar sesión' color={Colores.light.secondary} onPress={() => fire_auth.signOut()}></Button>
            </View>
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Add')}>
                <Image source={require('@/assets/images/add.svg')}></Image>
            </TouchableOpacity>
        </View>
    )
}

export default Tasks;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colores.light.background,
    },
    tasksPage: {
        backgroundColor: Colores.light.secondary,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headTitle: {
        color: Colores.light.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    headText: {
        color: Colores.light.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    add: {
        backgroundColor: Colores.light.secondary,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colores.light.outlineLight,
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
    cerrar: {
        position: 'absolute',
        bottom: 30,
        left: 30,
    },
    readText: {
        color: Colores.light.black,
        textShadowColor: Colores.light.white,
        textShadowOffset: {width: 1, height: 1},
        fontWeight: 'bold',
    }
});