import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_auth } from '@/FirebaseConf';
import { fire_db } from '@/FirebaseConf';
import {ref, set} from 'firebase/database';
import { useState } from 'react';
import { Colores } from '@/constants/Colores';
import User from '@/constants/User';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export const Add = ({ navigation} : RouterProps) => {
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [done,setDone] = useState('');
    const [prior,setPrior] = useState('');
    const [colors,setColors] = useState('');
    const [date,setDate] = useState('');

    const dataAddOn = () => {
        set(ref(fire_db,User()+'/posts/'+name), {
            name: name,
            desc: desc,
            done: done,
            prior: prior,
            colors: colors,
            date: date,
        });
        setName('');
        setDesc('');
        setDone('');
        setPrior('');
        setColors('');
        setDate('');
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>Añadir tarea</Text>
            <TextInput
                placeholder='Nombre'
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            >
            </TextInput>
            <TextInput
                placeholder='Descripción'
                value={desc}
                onChangeText={(text) => setDesc(text)}
                style={styles.input}
            >
            </TextInput>
            <TextInput
                placeholder='¿Completado?'
                value={done}
                onChangeText={(text) => setDone(text)}
                style={styles.input}
            >
            </TextInput>
            <TextInput
                placeholder='Urgencia'
                value={prior}
                onChangeText={(text) => setPrior(text)}
                style={styles.input}
            >
            </TextInput>
            <TextInput
                placeholder='Color'
                value={colors}
                onChangeText={(text) => setColors(text)}
                style={styles.input}
            >
            </TextInput>
            <Button
                title='Añadir tarea'
                onPress={dataAddOn}
                color={'#f84'}
            >
            </Button>
            <View style={{marginTop: 5}}>
                <Button title='Abrir tareas' color={'#f84'} onPress={() => navigation.navigate('Tasks')}></Button>
            </View>
        </View>
    )
}
export default Add;
const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colores.light.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: Colores.light.white,
      },
  });