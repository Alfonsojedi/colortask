import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Task from '@/components/Task';
import { Agenda } from 'react-native-calendars';
import ColorBox from '@/components/ColorBox';
import { NavigationProp } from '@react-navigation/native';
/*
LocaleConfig.locales['es']= {
    dayNamesShort: ['L','M','X','J','V','S','D'],
}
*/
const customTheme = {
    agendaTodayColor: '#f88',
    agendaKnobColor: '#f64',
    selectedDayBackgroundColor: '#f84',
    dotColor: '#f84',
}
const Check = (done=false) => {
    let color='#f21';
    if(done){
        color='#0d4';
    }
    return ({
        borderColor: color,
        borderWidth: 3,
        borderRadius: 20,
        flexDirection: 'row',
        width: 30,
        height: 30,
    })
}
const ColorPick = (colores='#888') => {
    return ({
        flex: 1,
        borderRadius: 20,
        backgroundColor: colores,
        borderColor: '#0008',
        borderWidth: 3,
        flexDirection: 'row',
        marginBottom: 5,
    })
}
const SinTareas = () => {
    return(
        <View style={styles.noItems}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>No hay tareas en este día.</Text>
        </View>
    )
}
const Tasks = () => {
    const [items, setItems] = useState({
        '2024-11-24': [],
        '2024-11-25': [{name: 'item 3 - any js object', colors: ['#fff'], desc: 'tareas' , done: true}],
        '2024-11-26': [{name: 'item 3 - any js object', desc: 'Algo', done: true , colors: ['#fff','#848','#344']}, {name: 'any js object', colors: ['#f75'], done: true},{name: 'item 1 - any js object', colors: [], done: false}],
        '2024-11-27': [{name: 'item 1 - any js object', colors: []}],
        '2024-11-23': [{name: 'item 2 - any js object', desc: 'tareas' , done: true}],
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
                    <Image source={require("@/assets/images/bell.svg")}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
                <View style={styles.calendario}>
                    <Agenda
                    items={items}
                    theme={customTheme}
                    showOnlySelectedDayItems={true}
                    renderEmptyData={SinTareas}
                    renderItem={(tasks) => (
                        <View style={ColorPick(tasks.colors[0])}>
                            <View style={styles.taskLeft}>
                                <View style={Check(tasks.done)}>

                                </View>
                            </View>
                            <View style={styles.taskRight}>
                                <ColorBox colores={tasks.colors}></ColorBox>
                                <Text>{tasks.name}</Text>
                                <Text>{tasks.task}</Text>
                                <Text>{tasks.desc}</Text>
                            </View>
                            <View style={styles.taskButtons}>
                                <TouchableOpacity>
                                    <Image source={require("@/assets/images/Delete.svg")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require("@/assets/images/Edit.svg")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    >
                    </Agenda>
                </View>
            </View>
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Tasks')}>
                <Image source={require("@/assets/images/add.svg")}></Image>
            </TouchableOpacity>
        </View>
    )
}

export default Tasks;

const styles = StyleSheet.create({
    noItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fec',
    },
    container: {
      flex: 1,
      backgroundColor: '#fec'
    },
    tasksPage: {
        backgroundColor: '#f84',
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
    taskTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    taskText: {
        color: '#fec',
        fontSize: 16,
        fontWeight: 'bold',
    },
    calendar:{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fec',
    },
    taskLeft: {
        width: 50,
        backgroundColor: '#f84',
        borderTopLeftRadius: 17,
        borderBottomLeftRadius: 17,
        alignContent:'center',
        justifyContent: 'center',
        padding: 10,
    },
    taskRight: {
        borderLeftWidth: 3,
        borderColor: '#0008',
        padding: 10,
    },
    taskButtons: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    calendario:{
        flex: 1,
        padding: 5,
    },
    add: {
        backgroundColor: '#f84',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff4',
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
  });