import React, { useState } from 'react';
import notifee from '@notifee/react-native'
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { Colores } from '@/constants/Colores';
import Task from '@/components/Task';
import styles from '@/constants/styles';

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
                <View style={{width: '60%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Add')}>
                        <Image source={require('@/assets/images/add.svg')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => navigation.navigate('Edit')}>
                        <Image source={require('@/assets/images/Edit.svg')}></Image>
                    </TouchableOpacity>
                    <Button title='Cerrar sesión' color={Colores.light.danger} onPress={() => fire_auth.signOut()}></Button>
                </View>
            </View>
            <Task></Task>
        </View>
    )
}

export default Tasks;
