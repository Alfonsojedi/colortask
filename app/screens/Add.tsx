import { View, Text, StyleSheet, Button, TextInput, Dimensions, Animated, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_db } from '@/FirebaseConf';
import {ref, set, update} from 'firebase/database';
import React, { useCallback, useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker'
import { Colores } from '@/constants/Colores';
import User from '@/constants/User';
import CheckboxList from '@/components/CheckboxList';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ColorPicker } from 'react-native-color-picker';

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
    const [selectColors, setSelectColors] = useState<string[]>([]);

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
    const dataUpdateOn = () => {
        update(ref(fire_db,User()+'/posts/'+name), {
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
        result ? setPrior('Urgente') : setPrior('No importante')
        setSelectPrior(result);
    };
    const pressedColors = (id: string) => {
        if (selectColors.includes(id)) {
            const newSelected = selectColors.filter(item => item !== id);
            return setSelectColors(newSelected);
        }
        const result = [...selectColors, id];
        setColors(result[0])
        setSelectColors(result);
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
    const optColors = [
        {
            id:'#E00',
            label: 'Rojo',
        },
        {
            id:'#CC0',
            label: 'Amarillo',
        },
        {
            id:'#0E0',
            label: 'Verde',
        },
        {
            id:'#0CC',
            label: 'Azul claro',
        },
        {
            id:'#00E',
            label: 'Azul',
        },
        {
            id:'#C0C',
            label: 'Morado',
        },
    ]
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Añadir o editar tarea</Text>
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
                placeholder='Fecha (YYYY-MM-DD)'
                value={date}
                onChangeText={(text) => setDate(text)}
                style={styles.input}
            ></TextInput>
            <DateTimePicker
            />
            <Text style={styles.text}>¿Terminaste la tarea?</Text>
            <CheckboxList
                options={optDone} 
                onPressCheckbox={pressedDone}
                selectedOption={selectDone}
            ></CheckboxList>
            <Text style={styles.text}>¿Es urgente?</Text>
            <CheckboxList
                options={optPrior} 
                onPressCheckbox={pressedUrgente}
                selectedOption={selectPrior}
            ></CheckboxList>
            <Text style={styles.text}>¿Qué color quieres?</Text>
            <CheckboxList
                options={optColors} 
                onPressCheckbox={pressedColors}
                selectedOption={selectColors}
            ></CheckboxList>
            <Button
                title='Añadir tarea'
                onPress={dataAddOn}
                color={Colores.light.secondary}
            ></Button>
            <Button
                title='Actualizar tarea'
                onPress={dataUpdateOn}
                color={Colores.light.warning}
            ></Button>
            <View style={{marginTop: 5}}>
                <Button title='Abrir tareas' color={Colores.light.secondary} onPress={() => navigation.navigate('Tasks')}></Button>
            </View>
        </ScrollView>
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});