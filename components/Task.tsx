import { fire_auth, fire_db } from '@/FirebaseConf';
import { onValue, ref, remove, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colores } from '@/constants/Colores';
import ColorBox from './ColorBox';
import { TaskText } from './TaskText';
import User from '@/constants/User';
import Checkbox from '@/components/Checkbox';
import { NavigationProp } from '@react-navigation/native';
import { SinTareas } from './SinTareas';
import CheckboxList from './CheckboxList';
import { taskStyle } from '@/constants/taskStyle';
import { DateType } from 'react-native-ui-datepicker';
import React from 'react';
import {format} from 'date-fns';

function eliminar(index: string){
    remove(ref(fire_db,User()+'/posts/'+index))
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
export function Task(){
    const [todoData,setTodoData] = useState<Array<any>>([]);
    const [mostrar, setMostrar] = useState(true);
    const [mostrador, setMostrador] = useState<string[]>([]);
    const mostradorFunction = (id: string) => {
        setMostrar(!mostrar)
        if (mostrador.includes(id)) {
            const newSelected = mostrador.filter(item => item !== id);
            return setMostrador(newSelected);
        }
        const result = [...mostrador, id];
        result ? setMostrar(true) : setMostrar(false);
        setMostrador(result);
    };

    useEffect(() => {
        const startCountRef = ref(fire_db,User()+'/posts/')
        try{
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            const posts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            if(posts.length>1){
                posts.sort(order); 
            }
            setTodoData(posts);
        })
        } catch{
            console.log('Sin tareas')
        }
    },[])

    if(todoData.length <= 0 || todoData == null){return <SinTareas></SinTareas>}
    //mostrador? setTodoData(todoData.filter((tasks) => { tasks.done!=true})): setTodoData(todoData)
    return(
        <ScrollView style={{paddingStart: 5, paddingTop: 5}} contentContainerStyle={{alignItems: 'stretch'}}>
            <CheckboxList
                options={[{id: '1', label: 'Mostrar completados'}]} 
                onPressCheckbox={mostradorFunction}
                selectedOption={mostrador}
            />
            {
            todoData.map((tasks,index) => {
                console.log(tasks.done)
                if (tasks.done && mostrar){
                return(
                    <View key={index} style={ColorPick(tasks.colors)}>
                        <View key={index} style={taskStyle.taskLeft}>
                            <Checkbox key={index} isChecked={tasks.done ? true : false} label={tasks.done}></Checkbox>
                        </View>
                        <View style={taskStyle.taskRight}>
                            <View>
                                <ColorBox colores={tasks.colors}></ColorBox>
                            </View>
                            <TaskText stroke={1} color='#fff8'>
                                <Text style={{fontSize: 18,color: Colores.light.black}}>{tasks.date}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff8'>
                                <Text style={{fontSize: 24,color: Colores.light.black}}>{tasks.name}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff8'>
                                <Text style={{fontSize: 14,color: Colores.light.black}}>{tasks.desc}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#0008'>
                                <Text style={tasks.prior==='Urgente'?{fontSize: 20,color: Colores.light.danger}:{fontSize: 14,color: Colores.light.white}}>{tasks.prior}</Text>
                            </TaskText>
                        </View>
                        <View style={taskStyle.taskButtons}>
                            <TouchableOpacity style={{marginRight: 5}} onPress={() => eliminar(tasks.name)}>
                                <Image source={require('@/assets/images/Delete.svg')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                }else{
                    return(<View></View>)
                }
            })}
            <View style={{height: 15}}></View>
        </ScrollView>
    )
}

export default Task;