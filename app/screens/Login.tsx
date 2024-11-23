import { View, StyleSheet, TextInput } from 'react-native';
import React, { useState} from 'react';
import { fire_auth } from '@/FirebaseConf';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const auth = fire_auth;
  return(
  <View style={styles.container}>
    <TextInput value={email} style={styles.input} onChangeText={(text) => setEmail(text)}></TextInput>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }
});

export default Login;