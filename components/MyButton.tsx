import { Colores } from "@/constants/Colores";
import { NavigationProp } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";


export function MyButton(navigation : NavigationProp<any, any>,text: String, link: String){
    return(
        <TouchableOpacity onPress={() => navigation.navigate(link)} style={{backgroundColor: Colores.light.secondary}}>
            <Text style={{color: Colores.light.white}}>{text}</Text>
        </TouchableOpacity>
    )
}

export default MyButton;