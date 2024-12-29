import { Colores } from "./Colores";
import {StyleSheet} from 'react-native';

export const taskStyle = StyleSheet.create({
    taskText: {
        color: Colores.light.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskLeft: {
        width: 48,
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