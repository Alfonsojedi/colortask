import { View, StyleSheet, TextInput, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
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
      alert('Por favor, compruebe su email.')
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
    <TextInput value={email} style={styles.input} placeholder='E-mail' onChangeText={(text) => setEmail(text)}></TextInput>
    <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Contraseña' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
    {loading ? 
      <ActivityIndicator size="large" color="#ff8800"></ActivityIndicator>
      :
      <>
        <Button title='Acceder' onPress={signIn}></Button>
        <Button title='Regístrate' onPress={signUp}></Button>
      </>}
    </KeyboardAvoidingView>
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