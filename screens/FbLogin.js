import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const FbLogin = () => {
  // const signInWithFacebook = async () => {
  //   console.log('clicked')
  // };

  return (
    <View className="flex justify-center items-center">
      <TouchableOpacity
       // onPress={signInWithFacebook}
        className="flex flex-row justify-center items-center mt-4 bg-blue-500 px-2 py-3"
      >
        <Image
          className=""
          source={{
            uri: "https://img.icons8.com/fluency/48/null/facebook-new.png",
          }}
          height={30}
          width={30}
        />
        <Text className="text-white mx-1 font-semibold">
          Sign in with facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FbLogin;
