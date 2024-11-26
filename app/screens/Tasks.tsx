import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import Task from '@/components/Task';
import { Agenda } from 'react-native-calendars';
import ColorBox from '@/components/ColorBox';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { TaskText } from '@/components/TaskText';
import { fire_db } from '@/FirebaseConf';
import {ref, onValue} from 'firebase/database';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
interface TaskProps { colors: (string | undefined)[]; done: boolean | undefined; name: string | undefined; desc: string | null | undefined; prior:  number | null | undefined; }
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
const ColorPick = (colores='#999') => {
    return ({
        flex: 1,
        borderRadius: 20,
        backgroundColor: colores,
        borderColor: '#0008',
        borderWidth: 3,
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
            const newPosts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log(newPosts);
            setTodoData(newPosts);
        })
    },[])
    return(
        <View>
            <Text>Tareas Añadidas</Text>
            {todoData.map((tasks,index) => {
                return( 
                    <View style={ColorPick(tasks.colors)}>
                        <View style={styles.taskLeft}>
                            <View style={Check(tasks.done)}></View>
                        </View>
                        <View style={styles.taskRight}>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 20,color: '#000'}}>{tasks.name}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 12,color: '#000'}}>{tasks.desc}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 16,color: '#e21'}}>{tasks.prior}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 16,color: '#2e1'}}>{tasks.date}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 16,color: '#12e'}}>{tasks.colors}</Text>
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
                <Button title='Cerrar sesión' color={'#f84'} onPress={() => fire_auth.signOut()}></Button>
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
        padding: 5,
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
    cerrar: {
        position: 'absolute',
        bottom: 30,
        left: 30,
    },
    readText: {
        color:'#000',
        textShadowColor: '#fff',
        textShadowOffset: {width: 1, height: 1},
        fontWeight: 'bold',
    }
  });