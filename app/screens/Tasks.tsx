import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Task from '@/components/Task';
import { Agenda, calendarTheme } from 'react-native-calendars';
/*
LocaleConfig.locales['es']= {
    dayNamesShort: ['L','M','X','J','V','S','D'],
}
*/
const customTheme = {
    ...calendarTheme,
    agendaTodayColor: '#f88',
    agendaKnobColor: '#f64',
    selectedDayBackgroundColor: '#f84',
    dotColor: '#f84',
}

const SinTareas = () => {
    return(
        <View style={styles.noItems}>
            <Text>No hay tareas para este día.</Text>
        </View>
    )
}
const Tasks = () => {
    const [items, setItems] = useState({
        '2024-11-22': [{name: 'item 1 - any js object'}],
        '2024-11-23': [{name: 'item 2 - any js object', height: 80}],
        '2024-11-24': [],
        '2024-11-25': [{name: 'item 3 - any js object', color: '#fff'}],
        '2024-11-26': [{name: 'item 3 - any js object', color: '#fff'}, {name: 'any js object', color: '#f75'}]
      });
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
                    theme={customTheme}
                    showOnlySelectedDayItems={true}
                    renderEmptyData={SinTareas}
                    renderItem={(items) => (
                        <View style={styles.task}>
                            <View style={styles.taskLeft}>
                                <Text>Todo</Text>
                            </View>
                            <View style={styles.taskRight}>
                                <Text>{items.color}</Text>
                                <Text>{items.name}</Text>
                                <Text>{items.task}</Text>
                                <Text>{items.desc}</Text>
                            </View>
                        </View>
                    )}
                    >

                    </Agenda>
                </View>
            </View>
        </View>
    )
}

export default Tasks;

const styles = StyleSheet.create({
    noItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
    },
    task:{
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#48f',
        borderColor: '#0008',
        borderWidth: 3,
        flexDirection: 'row',
    },
    taskLeft: {
        width: '10%',
        backgroundColor: '#f84',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignContent:'center',
        justifyContent: 'center',
        padding: 10,
    },
    taskRight: {
        borderLeftWidth: 3,
        borderColor: '#0008',
        padding: 10,
    },
    calendario:{
        flex: 1,
        padding: 20,
    },
  });