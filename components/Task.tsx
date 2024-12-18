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
    useEffect(() => {
        const startCountRef = ref(fire_db,User()+'/posts/')
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
    },[])

    if(todoData.length <= 0){return <SinTareas></SinTareas>}
    return(
        <ScrollView style={{paddingStart: 5, paddingEnd: 5}}>
            {todoData.map((tasks,index) => {
                return( 
                    <View key={index} style={ColorPick(tasks.colors)}>
                        <View style={styles.taskLeft}>
                            <Checkbox isChecked={tasks.done} label={''}></Checkbox>
                        </View>
                        <View style={styles.taskRight}>
                            <ColorBox colores={tasks.colors}></ColorBox>
                            <TaskText stroke={1} color='#000'>
                                <Text style={{fontSize: 12,color: Colores.light.success}}>{tasks.date}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 20,color: Colores.light.black}}>{tasks.name}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#fff'>
                                <Text style={{fontSize: 12,color: Colores.light.black}}>{tasks.desc}</Text>
                            </TaskText>
                            <TaskText stroke={1} color='#000'>
                                <Text style={tasks.prior === 'Urgente' ? {fontSize: 16,color: Colores.light.danger}: {fontSize: 16,color: Colores.light.white}}>{tasks.prior}</Text>
                            </TaskText>
                        </View>
                        <View style={styles.taskButtons}>
                            <TouchableOpacity style={{marginRight: 5}} onPress={() => eliminar(tasks.name)}>
                                <Image source={require('@/assets/images/Delete.svg')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight: 5}} onPress={() => navigation.navigate('Edit')}>
                                <Image source={require('@/assets/images/Edit.svg')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
            <View style={{height: 15}}></View>
        </ScrollView>
    )
}

export default Task;

const styles = StyleSheet.create({
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