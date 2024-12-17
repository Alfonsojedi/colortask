import { View, Text, StyleSheet } from 'react-native'

export function SinTareas() {
    return(
        <View style={styles.noItems}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>No hay tareas.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    noItems: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colores.light.background,
    },
})