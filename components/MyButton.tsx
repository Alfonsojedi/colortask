import { Colores } from "@/constants/Colores";
import { TouchableOpacity, Text } from "react-native";

export function MyButton(text: String){
    return(
        <TouchableOpacity style={{backgroundColor: Colores.light.secondary}}>
            <Text style={{color: Colores.light.white}}>{text}</Text>
        </TouchableOpacity>
    )
}