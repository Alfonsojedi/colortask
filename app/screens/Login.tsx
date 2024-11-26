import { View, StyleSheet, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useState} from 'react';
import { fire_auth } from '@/FirebaseConf';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const auth = fire_auth;

  const signIn = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth,email,password);
      console.log(response);
    }catch (error){
      console.log(error);
      alert('Hubo un error al entrar. Compruebe sus datos:\n'+error)
    }finally{
      setLoading(false);
    }
  }
  const signUp = async () => {
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email,password);
      console.log(response)
    }catch (error){
      console.log(error);
      alert('Hubo un error al registrarse. Compruebe sus datos:\n'+error)
    }finally{
      setLoading(false);
    }
  }
  return(
  <View style={styles.container}>
    <KeyboardAvoidingView behavior='padding'>
    <Text style={styles.title}>Colortask</Text>
    <TextInput value={email} style={styles.input} placeholder='E-mail' onChangeText={(text) => setEmail(text)}></TextInput>
    <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Contraseña' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
    {loading ? 
      <ActivityIndicator size="large" color="#ff8800"></ActivityIndicator>
      :
      <>
        <Button title='Acceder' color={'#f84'} onPress={signIn}></Button>
        <View style={styles.gap}></View>
        <Button title='Regístrate' color={'#f84'} onPress={signUp}></Button>
      </>}
    </KeyboardAvoidingView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    color: '#f84',
    margin: 10,
    width: '40%',
  },
  title: {
    color: '#f84',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  gap: {
    height: 10,
  }
});

export default Login;