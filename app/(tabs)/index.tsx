import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Login from '../screens/Login';
import List from '../screens/List';
import Details from '../screens/Details';
import { onAuthStateChanged, User } from 'firebase/auth';
import { fire_auth } from '@/FirebaseConf';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name="To do" component={List}></InsideStack.Screen>
      <InsideStack.Screen name="Details" component={Details}></InsideStack.Screen>
    </InsideStack.Navigator>
  )
}

export default function HomeScreen() {
  const [user,setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(fire_auth, (user) => {
      console.log('user',user);
      setUser(user);
    })
  })
  return(
    <Stack.Navigator initialRouteName='Login'>
      {user ? (
        <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}></Stack.Screen>
      ) : (
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
}