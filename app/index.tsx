import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { fire_auth } from '@/FirebaseConf';
import Login from './screens/Login';
import List from './screens/List';
import Tasks from './screens/Tasks';
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name="List" component={List} options={{headerShown: false}}></InsideStack.Screen>
      <InsideStack.Screen name="Add" component={Add} options={{headerShown: false}}></InsideStack.Screen>
      <InsideStack.Screen name="Edit" component={Edit} options={{headerShown: false}}></InsideStack.Screen>
      <InsideStack.Screen name="Tasks" component={Tasks} options={{headerShown: false}}></InsideStack.Screen>
    </InsideStack.Navigator>
  )
}

export default function HomeScreen() {
  const [user,setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(fire_auth, (user) => {
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