import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Task from '@/components/Task';
import { Agenda, CalendarTheme } from 'react-native-calendars';

const Tasks = () => {
    const [items, setItems] = useState('');
    return(
        <View style={styles.container}>
            <View style={styles.tasksPage}>
                <View style={styles.profile}>
                    <View style={styles.lista}>
                        <Text style={styles.taskTitle}>Lista de tareas</Text>
                        <Text style={styles.taskText}>Tareas a completar</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image source={require("@/assets/images/bell.png")} style={styles.notificar}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
                <View style={styles.calendario}>
                    <Agenda
                    items={items}
                    theme={"customTheme"}
                    showOnlySelectedDayItems={true}
                    >

                    </Agenda>
                </View>
            </View>
        </View>
    )
}

export default Tasks;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tasksPage: {
        backgroundColor: '#F84',
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lista: {

    },
    notificar: {
        width: 40,
        height: 40,
    },
    taskTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    taskText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    calendar:{
        flex: 1,
    },
    calendario:{
        flex: 1,
    },
  });