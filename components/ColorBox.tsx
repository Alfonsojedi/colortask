import { View, TouchableOpacity } from 'react-native';
import { Colores } from '@/constants/Colores';

const Boxer = (color: String) => {
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
interface coloresProps {
    colores: (String | Array<String>);
}
export function ColorBox({colores}: coloresProps){
    if(typeof colores === 'string'){
        colores = [colores];
    }
    return(
        <View style={{flex:1, flexDirection: 'row', maxWidth: '70%', marginBottom: 5}}>
            {colores.map((color: String) => (
                <TouchableOpacity style={Boxer(color)}></TouchableOpacity>
            ))}
        </View>
    )
}

export default ColorBox;