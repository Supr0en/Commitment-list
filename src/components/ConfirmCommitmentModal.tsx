import { View, Text, Modal, Pressable, TextInput, Alert, Image } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ConfirmCommitmentModal() {
   const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState<boolean>(false);
   const [errorMessage, setErrorMessage] = React.useState<string>("");
   const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(null);
   const [imageDescription, setImageDescription] = React.useState<string>("");
   const takePhoto = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
         Alert.alert('Camera permission is required');
         return;
      }
      const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8, });
      if (!result.canceled) {
         setImage(result.assets[0]);
      }
   }
   const loadImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8, });
      if (!result.canceled) {
         setImage(result.assets[0]);
      }
   }
   const handleClose = () => {
      setIsConfirmModalVisible(!isConfirmModalVisible);
      setErrorMessage("");
      setImageDescription("");
      setImage(null);
   }
   const handleSubmit = () => {
      
      handleClose();
   }
   return (
      <View>
         <View className="bottom-[-65px]">
            <Pressable onPress={() => setIsConfirmModalVisible(!isConfirmModalVisible)} className="border-2 border-black p-3 m-1 rounded-2xl">
               <Text>Submit Commitment</Text>
            </Pressable>
         </View>
         <View>
            <Modal animationType="slide" transparent={true} visible={isConfirmModalVisible} >
               <View className="flex-col bg-white m-1 p-3 border-2 border-black h-[300px] w-[80%] items-center top-[150px] left-[10%] rounded-3xl">
                  <Text className="text-2xl font-extrabold text-blue-950">Submit commitment</Text>
                  <View className="m-1 p-3 w-full">
                     <View className="flex-row justify-center">
                        <Pressable className="border-2 border-blue-700 m-1 p-3 rounded-2xl" onPress={() => takePhoto()}><Text>&#x1F4F7;</Text></Pressable>
                        <Pressable className="border-2 border-blue-700 m-1 p-3 rounded-2xl" onPress={() => loadImage()}><Text>&#x1F4C1;</Text></Pressable>
                     </View>
                     <View className="border-2 border-black w-full h-20 z-1 rounded-2xl">
                        {image && (
                           <Image source={{ uri: image.uri }} className="rounded-xl w-full h-full" />
                        )}
                     </View>
                     <TextInput placeholder="Add image description" className="m-1 p-3 border-2 border-gray-200 bg-white w-full rounded-2xl text-black" onChangeText={setImageDescription} />
                  </View>
                  <View className="flex-row align-middle">
                     <Pressable className="border-2 border-green-700 m-1 p-3 rounded-2xl" onPress={() => handleSubmit()}><Text className="text-green-700 font-bold">Submit completion</Text></Pressable>
                     <Pressable onPress={() => handleClose()} className="border-2 border-red-600 m-1 p-3 rounded-2xl"><Text className='text-red-600'>&#10006;</Text></Pressable>
                  </View>
                  <Text className="text-red-500">{errorMessage}</Text>
               </View>
            </Modal>
         </View>
      </View>
   );
}
