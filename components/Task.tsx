import { fire_auth, fire_db } from '@/FirebaseConf';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colores } from '@/constants/Colores';
import ColorBox from './ColorBox';
import { TaskText } from './TaskText';
import User from '@/constants/User';
import Checkbox from '@/components/Checkbox';
import { NavigationProp } from '@react-navigation/native';

export const SinTareas = () => {
    return(
        <View style={styles.noItems}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>No hay tareas en este día.</Text>
        </View>
    )
}
const ColorPick = (colores='#999') => {
    return ({
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colores,
        borderRadius: 10,
        borderColor: Colores.light.outline,
        borderWidth: 2,
        marginTop: 5,
        
    })
}
function order(a: Object,b: Object){
    return a.date.localeCompare(b.date);
}
interface RouterProps {
    navigation: NavigationProp<any, any>;
}
export function Task({navigation} : RouterProps){
    const [todoData,setTodoData] = useState<Array<any>>([]);
    useEffect(() => {
        const startCountRef = ref(fire_db,User()+'/posts/')
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            const posts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            posts.sort(order);
            setTodoData(posts);
        })
    },[])
    if(todoData.length <= 0){
        return <SinTareas></SinTareas>
    }
    return(
        <View>
            {todoData.map((tasks,index) => {
                return( 
                    <View key={index} style={ColorPick(tasks.colors)}>
                        <View style={styles.taskLeft}>
                            <Checkbox isChecked={tasks.done} label={''}></Checkbox>
                        </View>
                        <View style={styles.taskRight}>
                            <ColorBox colores={tasks.colors}></ColorBox>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 20,color: Colores.light.black}}>{tasks.name}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 12,color: Colores.light.success}}>{tasks.date}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 12,color: Colores.light.black}}>{tasks.desc}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 16,color: Colores.light.danger}}>{tasks.prior}</Text>
                            </TaskText>
                        </View>
                        <View style={styles.taskButtons}>
                            <TouchableOpacity style={{marginRight: 5}}>
                                <Image source={require('@/assets/images/Delete.svg')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight: 5}} onPress={() => navigation.navigate('Edit')}>
                                <Image source={require('@/assets/images/Edit.svg')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default Task;

const styles = StyleSheet.create({
    noItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colores.light.background,
    },
    taskText: {
        color: Colores.light.background,
        fontSize: 16,
        fontWeight: 'bold',
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
    }
});