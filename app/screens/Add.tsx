import { View, Text, StyleSheet, Button, TextInput, Dimensions, Animated, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { fire_db } from '@/FirebaseConf';
import {ref, set, update} from 'firebase/database';
import React, { useCallback, useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker'
import { Colores } from '@/constants/Colores';
import User from '@/constants/User';
import CheckboxList from '@/components/CheckboxList';
import dayjs from 'dayjs'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

    const [time, setTime] = useState(dayjs())
    const setDates = (date: React.SetStateAction<dayjs.Dayjs> | any) => {
        
        setDate(date.date.toLocaleString());
        setTime(date.date);
    }
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
            <View style={{minHeight: '100%',backgroundColor: Colores.light.background}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Añadir tarea</Text>
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <View style={{scaleY: 0.2, width: '75%', borderRadius: 20 ,backgroundColor: Colores.light.outlineLight}}>
                        <DateTimePicker
                            firstDayOfWeek={1}
                            mode='single'
                            date={time}
                            weekDaysContainerStyle={{backgroundColor: Colores.light.secondary}}
                            dayContainerStyle={{padding: 0}}
                            todayContainerStyle={{borderColor: Colores.light.secondary}}
                            todayTextStyle={{color: Colores.light.black, fontWeight: 'bold'}}
                            selectedItemColor='#082'
                            selectedTextStyle={{fontWeight: 'bold'}}
                            calendarTextStyle={{lineHeight: 0}}
                            height={220}
                            headerTextStyle={{fontSize: 20, lineHeight: 0}}
                            onChange={(date) => setDates(date)}
                        />
                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
                    <View style={{width: '40%',paddingEnd: 5}}>
                        <Text style={styles.text}>Nombre</Text>
                        <TextInput
                            placeholder='Nombre'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                        ></TextInput>
                    </View>
                    <View style={{width: '60%'}}>
                        <Text style={styles.text}>Descripción</Text>
                        <TextInput
                            placeholder='Descripción'
                            value={desc}
                            onChangeText={(text) => setDesc(text)}
                            style={styles.input}
                        ></TextInput>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row',  padding: 5,borderRadius: 10,backgroundColor: Colores.light.outlineLight}}>
                    <View style={{display: 'flex', flexDirection: 'row', width: '45%', alignItems: 'center'}}>
                        <View style={{width: '75%', alignItems: 'flex-end'}}>
                            <Text style={styles.text}>¿Terminaste la tarea?</Text>
                        </View>
                        <CheckboxList
                            options={optDone} 
                            onPressCheckbox={pressedDone}
                            selectedOption={selectDone}
                        ></CheckboxList>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', width: '45%', alignItems: 'center'}}>
                        <View style={{width: '75%', alignItems: 'flex-end'}}>
                            <Text style={styles.text}>¿Es urgente?</Text>
                        </View>
                        <CheckboxList
                            options={optPrior} 
                            onPressCheckbox={pressedUrgente}
                            selectedOption={selectPrior}
                        ></CheckboxList>
                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{width: '40%', alignItems: 'flex-end'}}>
                        <Text style={styles.text}>¿Qué color quieres?</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <CheckboxList
                        options={optColors} 
                        onPressCheckbox={pressedColors}
                        selectedOption={selectColors}
                    ></CheckboxList>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{padding: 5}}>
                        <Button
                            title='Añadir tarea'
                            onPress={dataAddOn}
                            color={Colores.light.secondary}
                        ></Button>
                    </View>
                    <View style={{padding: 5}}>
                    <Button
                        title='Abrir tareas'
                        color={Colores.light.secondary} 
                        onPress={() => navigation.navigate('Tasks')}
                    ></Button>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

export default Add;

const styles =  StyleSheet.create({
    container: {
      backgroundColor: Colores.light.background,
      padding: 10,
      minHeight: '100%',
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