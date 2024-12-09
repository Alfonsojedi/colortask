import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';
import ColorBox from '@/components/ColorBox';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { TaskText } from '@/components/TaskText';
import { fire_db } from '@/FirebaseConf';
import {ref, onValue} from 'firebase/database';
import { Colores } from '@/constants/Colores';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
//interface TaskProps { colors: (string | undefined)[]; done: boolean | undefined; name: string | undefined; desc: string | null | undefined; prior:  number | null | undefined; }
/*
const customTheme = {
    agendaTodayColor: '#f88',
    agendaKnobColor: '#f64',
    selectedDayBackgroundColor: '#f84',
    dotColor: '#f84',
}*/
const Check = (done=false) => {
    let color=Colores.light.danger;
    if(done){
        color=Colores.light.success;
    }
    return ({
        borderColor: color,
        borderWidth: 4,
        borderRadius: 20,
        flexDirection: 'row',
        width: 30,
        height: 30,
    })
}
const ColorPick = (colores='#999') => {
    return ({
        flex: 1,
        borderRadius: 10,
        backgroundColor: colores,
        borderColor: '#0008',
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 5,
    })
}
const SinTareas = () => {
    return(
        <View style={styles.noItems}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>No hay tareas en este día.</Text>
        </View>
    )
}
const FetchData = () => {
    const [todoData,setTodoData] = useState([]);
    useEffect(() => {
        const startCountRef = ref(fire_db, 'posts/')
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            const posts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log(posts);
            setTodoData(posts);
        })
    },[])
    return(
        <View>
            <Text>31-12-2024</Text>
            {todoData.map((tasks,index) => {
                return( 
                    <View style={ColorPick(tasks.colors)}>
                        <View style={styles.taskLeft}>
                            <View style={Check(tasks.done)}></View>
                        </View>
                        <View style={styles.taskRight}>
                            <ColorBox colores={tasks.colors}></ColorBox>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 20,color: '#000'}}>{tasks.name}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 12,color: '#0d4'}}>{tasks.date}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 12,color: '#000'}}>{tasks.desc}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 16,color: '#e21'}}>{tasks.prior}</Text>
                            </TaskText>
                        </View>
                        <View style={styles.taskButtons}>
                            <TouchableOpacity style={{marginRight: 5}}>
                                <Image source={require("@/assets/images/Delete.svg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight: 5}}>
                                <Image source={require("@/assets/images/Edit.svg")}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View>
)
}
/*const pruebas = {
    '2024-11-24': [],
    '2024-11-25': [{name: 'item 3 - any js object', colors: ['#fff'], desc: 'tareas' , done: true}],
    '2024-11-26': [{name: 'Diseñando task', desc: 'Algo', done: true , colors: ['#08f','#848','#344'], prior: 1}, {name: 'any js object', colors: ['#f31'], done: true},{name: '3º task', colors: [], done: false}],
    '2024-11-27': [{name: 'Unir con BBDD', colors: [], done: false}],
    '2024-11-28': [{name: 'Crear add/edit', colors: [], desc: 'tareas' , done: false}],
}*/
const Tasks = ({ navigation} : RouterProps) => {
    const [items, setItems] = useState('');

    return(
        <View style={styles.container}>
            <View style={styles.tasksPage}>
                <View style={styles.profile}>
                    <View>
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
                <FetchData></FetchData>
                </View>
            </View>
            <View style={styles.cerrar}>
                <Button title='Cerrar sesión' color={Colores.light.secondary} onPress={() => fire_auth.signOut()}></Button>
            </View>
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Add')}>
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
        backgroundColor: Colores.light.background,
    },
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
    taskTitle: {
        color: Colores.light.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    taskText: {
        color: Colores.light.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    calendar:{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colores.light.background,
    },
    taskLeft: {
        width: 50,
        backgroundColor: Colores.light.secondary,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        alignContent:'center',
        justifyContent: 'center',
        padding: 10,
    },
    taskRight: {
        borderLeftWidth: 2,
        borderColor: Colores.light.outline,
        padding: 5,
        maxWidth: '70%',
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