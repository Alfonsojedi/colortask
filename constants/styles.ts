import { Colores } from "./Colores";
import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colores.light.background,
    },
    tasksPage: {
        backgroundColor: Colores.light.secondary,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%',
    },
    headTitle: {
        color: Colores.light.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    headText: {
        color: Colores.light.outline,
        fontSize: 16,
        fontWeight: 'bold',
    },
    add: {
        backgroundColor: Colores.light.success,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colores.light.outlineLight,
        maxWidth: 45,
    },
    readText: {
        color: Colores.light.black,
        textShadowColor: Colores.light.white,
        textShadowOffset: {width: 1, height: 1},
        fontWeight: 'bold',
    }
});

export default styles;