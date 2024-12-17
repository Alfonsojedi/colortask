import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_db } from '@/FirebaseConf';
import {ref, set} from 'firebase/database';
import { useState } from 'react';
import { Colores } from '@/constants/Colores';
import User from '@/constants/User';
import Checkbox from '@/components/Checkbox';
import CheckboxList from '@/components/CheckboxList';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export const Add = ({navigation} : RouterProps) => {
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [done,setDone] = useState(false);
    const [prior,setPrior] = useState('');
    const [colors,setColors] = useState('');
    const [date,setDate] = useState('');

    const [selectPrior, setSelectPrior] = useState<string[]>([]);
    const [selectDone, setSelectDone] = useState<string[]>([]);

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
        setDone(false);
        setPrior('');
        setColors('');
        setDate('');
    }

    const pressedDone = (id: string) => {
        if (selectDone.includes(id)) {
            const newSelected = selectDone.filter(item => item !== id);
            return setSelectDone(newSelected);
        }
        const result = [...selectDone, id];
        result ? setDone(true) : setDone(false);
        setSelectDone(result);
    };
    const pressedUrgente = (id: string) => {
        if (selectPrior.includes(id)) {
            const newSelected = selectPrior.filter(item => item !== id);
            return setSelectPrior(newSelected);
        }
        const result = [...selectPrior, id];
        result ? setPrior("Urgente") : setPrior("No importante")
        setSelectPrior(result);
    };

    const optPrior = [
        {
            id:'1',
            label: 'Urgente',
        },
    ];
    const optDone = [
        {
            id:'1',
            label: 'Sí',
        },
    ];

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>Añadir tarea</Text>
            <TextInput
                placeholder='Nombre'
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            ></TextInput>
            <TextInput
                placeholder='Descripción'
                value={desc}
                onChangeText={(text) => setDesc(text)}
                style={styles.input}
            ></TextInput>
            <TextInput
                placeholder='Fecha'
                value={date}
                onChangeText={(text) => setDate(text)}
                style={styles.input}
            ></TextInput>
            <Text>¿Terminaste la tarea?</Text>
            <CheckboxList
                options={optDone} 
                onPressCheckbox={pressedDone}
                selectedOption={selectDone}
            ></CheckboxList>
            <Text>¿Es urgente?</Text>
            <CheckboxList
                options={optPrior} 
                onPressCheckbox={pressedUrgente}
                selectedOption={selectPrior}
            ></CheckboxList>
            <TextInput
                placeholder='Color'
                value={colors}
                onChangeText={(text) => setColors(text)}
                style={styles.input}
            ></TextInput>
            <Button
                title='Añadir tarea'
                onPress={dataAddOn}
                color={Colores.light.secondary}
            ></Button>
            <View>
                <View>

                </View>
                <View>
                    0k
                </View>
            </View>
            <View style={{marginTop: 5}}>
                <Button title='Abrir tareas' color={Colores.light.secondary} onPress={() => navigation.navigate('Tasks')}></Button>
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