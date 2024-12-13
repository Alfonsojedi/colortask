import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { Colores } from '@/constants/Colores';
import { Agenda } from 'react-native-calendars';
import Task from '@/components/Task';

/*
interface TaskProps { colors: (string | undefined)[]; done: boolean | undefined; name: string | undefined; desc: string | null | undefined; prior:  number | null | undefined; }
const customTheme = {
    agendaTodayColor: '#f88',
    agendaKnobColor: '#f64',
    selectedDayBackgroundColor: '#f84',
    dotColor: '#f84',
}
const pruebas = {
    '2024-11-24': [],
    '2024-11-25': [{name: 'item 3 - any js object', colors: ['#fff'], desc: 'tareas' , done: true}],
    '2024-11-26': [{name: 'Diseñando task', desc: 'Algo', done: true , colors: ['#08f','#848','#344'], prior: 1}, {name: 'any js object', colors: ['#f31'], done: true},{name: '3º task', colors: [], done: false}],
    '2024-11-27': [{name: 'Unir con BBDD', colors: [], done: false}],
    '2024-11-28': [{name: 'Crear add/edit', colors: [], desc: 'tareas' , done: false}],
}*/
interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const Tasks = ({ navigation} : RouterProps) => {
    //const [items, setItems] = useState('');
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
                    <Image source={require('@/assets/images/bell.svg')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
                <View style={styles.calendario}>
                <Task></Task>
                </View>
            </View>
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
    calendar: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colores.light.background,
    },
    calendario: {
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