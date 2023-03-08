import { View, Text, TouchableOpacity, Image, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

GoogleSignin.configure({
  webClientId: '254115731633-idptf1cjo263v1f0ei6h0s27qq5kgcjs.apps.googleusercontent.com',
});

const GoogleLogin = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const onGoogleButtonPress = async () => {
    
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error) 
    }
  }
  

  // signout
  const signOut = async () => {
    try 
    {
      await GoogleSignin.revokeAccess();
      auth().signOut().then(() => 
      {
        console.log('User signed out!');
      });
    }catch (error){
      console.log(error);
    }
  }

  if (initializing) return null;
  
if (!user) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='font-bold text-3xl text-center m-5'>Login to continue...</Text>

        <GoogleSigninButton style={{ width: 194, height: 60 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />

        <TouchableOpacity className='flex flex-row justify-center items-center mt-4 bg-blue-500 px-2 py-3'>
        <Image className='' source={{uri : 'https://img.icons8.com/fluency/48/null/facebook-new.png'}} height={30} width={30} />
        <Text className='text-white mx-1 font-semibold'>Sign in with facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='font-bold text-3xl text-center'>Welcome!!!</Text>
      <View className='border-2 flex items-center p-2 rounded-md m-4'>
        <Text className='font-bold text-xl text-center p-3'>{user.email}</Text>
        <Image source={{uri: user.photoURL}} className='w-60 h-60 m-2'/>
      </View>
      
      <TouchableOpacity onPress={signOut}>
        <Text className='bg-green-500 p-4 font-semibold rounded m-4'>Sign Out!!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GoogleLogin