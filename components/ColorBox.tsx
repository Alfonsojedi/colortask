import { View, TouchableOpacity } from 'react-native';
import { Colores } from '@/constants/Colores';

const Boxer = (color: string) => {
    return ({
        borderRadius: 5,
        backgroundColor: color,
        borderColor: Colores.light.outline,
        borderWidth: 3,
        flexDirection: 'row',
        width: 24,
        height: 24,
        marginRight: 5,
    })
}
interface coloresProps {
    colores: (string | Array<string>);
}
export function ColorBox({colores}: coloresProps){
    if(typeof colores === 'string'){
        colores = [colores];
    }
    return(
        <View style={{flex:1, flexDirection: 'row', maxWidth: '70%', marginBottom: 5}}>
            {colores.map((color: string) => (
                <TouchableOpacity style={Boxer(color)}></TouchableOpacity>
            ))}
        </View>
    )
}

export default ColorBox;