import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Task from '@/components/Task';

const Tasks = () => {
    const [items, setItems] = useState('');
    return(
        <View style={styles.container}>
            <View style={styles.tasksPage}>
                <View style={styles.profile}>
                    <View style={styles.lista}>
                        <Text style={styles.taskText}>Lista de tareas</Text>
                        <Text style={styles.taskText}>Tareas a completar</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image source={require("@/assets/images/bell.png")} style={styles.notificar}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tasks;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    tasksPage: {
        backgroundColor: '#F84'
    },
    profile: {

    },
    lista: {

    },
    notificar: {
        width: 40,
        height: 40,
    },
    taskText: {
        color: '#FFF',
        fontSize: 16,
    }
  });