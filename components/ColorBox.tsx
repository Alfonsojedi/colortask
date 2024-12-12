import { View } from 'react-native';
import { Colores } from '@/constants/Colores';

const Boxer = (color) => {
    return ({
        borderRadius: 5,
        backgroundColor: color,
        borderColor: Colores.light.outline,
        borderWidth: 3,
        flexDirection: 'row',
        width: 20,
        height: 20,
        marginRight: 5,
    })
}

export default function ColorBox({colores}){
    if(typeof colores === 'string'){
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={Boxer(colores)}></View>
            </View>
        )
    }
    return(
        <View style={{flex:1, flexDirection: 'row'}}>
        {colores.map(color => (
            <View style={Boxer(color)}></View>
        ))}
        </View>
    )
}