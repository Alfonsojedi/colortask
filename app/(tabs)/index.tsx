import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View } from 'react-native';
import Login from '../screens/Login';


const Stack = createNativeStackNavigator();
export default function HomeScreen() {
  return(
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
  );
}