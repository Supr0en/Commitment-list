import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import React from 'react';
import { createPromise, savePromises } from '../helpers/AsyncStorage';
import { Promise } from '../interfaces';

interface PromiseModalProps {
   promises: Promise[];
   onSubmit: (data: Promise) => void;
}

export default function PromiseModal({ promises, onSubmit }: PromiseModalProps) {
   const [isVisible, setIsVisible] = React.useState<boolean>(false);
   const [promiseName, setPromiseName] = React.useState<string>("");
   const [days, setDays] = React.useState<number>(7);
   const [hours, setHours] = React.useState<number>(12);
   const [errorMessage, setErrorMessage] = React.useState<string>("");

   const handleSubmit = () => {
      const curDate = new Date()
      const endDate: string = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + (curDate.getDate() + days) + "T" + (curDate.getHours() + hours + ":00");
      try {
         if (promiseName.length == 0) {
            setErrorMessage("CommitmentName has to have input");
            return;
         }
         const newPromise: Promise = createPromise(promiseName, endDate);
         savePromises([...promises, newPromise])
         setIsVisible(!isVisible);
         onSubmit(newPromise);
      } catch (error) {
         console.error("Error while handling submit", error);
         setErrorMessage("Something when't wrong in addign new Commitment")
      }
   }
   const handleClose = () => {
      setIsVisible(!isVisible);
      setErrorMessage("");
   }
   return (
      <View>
         <View>
            <Pressable onPress={() => setIsVisible(!isVisible)} className="border-2 border-black p-3 m-1 rounded-2xl">
               <Text>Create new Commitment</Text>
            </Pressable>
         </View>
         <View>
            <Modal animationType="slide" transparent={true} visible={isVisible} >
               <View className="flex-col bg-white m-1 p-3 border-2 border-black h-[300px] w-[80%] items-center top-[150px] left-[10%] rounded-3xl">
                  <Text className="text-2xl font-extrabold color-blue-950">Create a commitment</Text>
                  <TextInput placeholder="New commitment" className="m-1 p-3 border-2 border-gray-200 bg-white w-full rounded-2xl" onChangeText={setPromiseName} />
                  <View className="flex-row items-center justify-center ml-1 my-2">
                     <Text className="text-2xl font-bold mr-2">Days</Text>
                     <View className="flex flex-col items-center border-x-[1px] border-gray-200">
                        <Pressable onPress={() => { if (days != 14) setDays(days + 1) }}><Text className="text-4xl">&#9650;</Text></Pressable>
                        <Text className="text-4xl">{days.toString()}</Text>
                        <Pressable onPress={() => { if (days != 1) setDays(days - 1) }}><Text className="text-4xl">&#9660;</Text></Pressable>
                     </View>
                     <View className="flex flex-col items-center border-x-[1px] border-gray-200 ml-3 mr-1">
                        <Pressable onPress={() => { if (hours != 23) setHours(hours + 1) }}><Text className="text-4xl">&#9650;</Text></Pressable>
                        <Text className="text-4xl">{hours.toString()}</Text>
                        <Pressable onPress={() => { if (hours != 0) setHours(hours - 1) }}><Text className="text-4xl">&#9660;</Text></Pressable>
                     </View>
                     <Text className="text-2xl font-bold">Hours</Text>
                  </View>
                  <View className="flex-row  align-middle">
                     <Pressable className="border-2 border-green-700 m-1 p-3 rounded-2xl" onPress={() => handleSubmit()}><Text className="color-green-700 font-bold">Create New Promise</Text></Pressable>
                     <Pressable onPress={() => handleClose()} className="border-2 border-red-600 m-1 p-3 rounded-2xl"><Text className='color-red-600'>&#10006;</Text></Pressable>
                  </View>
                  <Text className="color-red-500">{errorMessage}</Text>
               </View>
            </Modal >
         </View>
      </View >
   )
}
