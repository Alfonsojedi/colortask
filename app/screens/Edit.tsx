import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { fire_db } from '@/FirebaseConf';
import {ref, set} from 'firebase/database';
import { useState } from 'react';
import { Colores } from '@/constants/Colores';
import User from '@/constants/User';
import Checkbox from '@/components/Checkbox';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Edit = ({ navigation} : RouterProps) => {
    //Obtener datos
    return(
        <View>

        </View>
    )
}

export default Edit;