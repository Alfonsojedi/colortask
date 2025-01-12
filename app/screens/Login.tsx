import { View, StyleSheet, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useState} from 'react';
import { fire_auth } from '@/FirebaseConf';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { Colores } from '@/constants/Colores';

const Login = () => {
  const auth = fire_auth;
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [errorMsg,setErrorMsg] = useState<any>('');
  const signIn = async () => {
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth,email,password);
    }catch (error){
      console.log(error);
      setErrorMsg('Hubo un error al entrar. Compruebe sus datos:\n'+error);
    }finally{
      setLoading(false);
    }
  }
  const signUp = async () => {
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email,password);
    }catch (error){
      console.log(error);
      setErrorMsg('Hubo un error al registrarse. Compruebe sus datos:\n'+error);
    }finally{
      setLoading(false);
    }
  }
  return(
  <View style={styles.container}>
    <View style={styles.box}>
      <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.title}>Colortask</Text>
        <Text style={styles.subtitle}>2025</Text>
        <Text style={{fontWeight: 'bold'}}>Correo:</Text>
        <TextInput value={email} style={styles.input} placeholder='E-mail' onChangeText={(text) => setEmail(text)}></TextInput>
        <Text style={{fontWeight: 'bold'}}>Contraseña:</Text>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Contraseña' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
        <Text style={{color: Colores.light.danger, fontWeight: 'bold'}}>{errorMsg}</Text>
        {loading ? 
          <ActivityIndicator size="large" color={Colores.light.secondary}></ActivityIndicator>
          :
          <>
            <View style={{marginBottom: 5}}>
              <Button title='Acceder' color={Colores.light.secondary} onPress={signIn}></Button>
            </View>
            <View style={{marginBottom: 5}}>
              <Button title='Regístrate' color={Colores.light.secondary} onPress={signUp}></Button>
            </View>
          </>}
      </KeyboardAvoidingView>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colores.light.background,
  },
  box: {
    borderWidth: 3,
    borderColor: Colores.light.secondary,
    borderRadius: 10,
    backgroundColor:  Colores.light.outlineLight,
    padding: 20,
    minWidth: '40%',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: Colores.light.white,
  },
  button: {
    color: Colores.light.secondary,
    margin: 10,
    width: '40%',
  },
  title: {
    color: Colores.light.secondary,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  subtitle: {
    color: Colores.light.outline,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Login;