import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import React from 'react';
import { createPromise, savePromises } from '../helpers/AsyncStorage';
import { Promise } from '../interfaces';

interface PromiseModalProps {
   promises: Promise[];
   onSubmit: (data: Promise) => void;
}

export default function PromiseModal({ promises, onSubmit}: PromiseModalProps) {
   const [isVisible, setIsVisible] = React.useState<boolean>(false);
   const [promiseName, setPromiseName] = React.useState<string>("");
   const [days, setDays] = React.useState<number>(7);
   const [hours, setHours] = React.useState<number>(12);

   const handleSubmit = () => {
      const curDate = new Date()
      const endDate: string = curDate.getFullYear() + "-" + (curDate.getMonth() +1) + "-" + (curDate.getDate() + days) + "T" + (curDate.getHours() + hours + ":00");
      try {
         const newPromise: Promise = createPromise(promiseName, endDate);
         savePromises([...promises, newPromise])
         setIsVisible(!isVisible);
         onSubmit(newPromise);
      } catch (error) {
         console.error("Error while handling submit", error)
      }
   }
   return (
      <View>
         <View>
            <Pressable onPress={() => setIsVisible(!isVisible)} className="border-2 border-black p-3 m-1">
               <Text>I'm pressabele!</Text>
            </Pressable>
         </View>
         <View>
            <Modal animationType="slide" transparent={true} visible={isVisible} >
               <View className="flex-col bg-white m-1 p-3 border-2 border-black h-[300px] w-[80%] items-center top-[150px] left-[10%] rounded-3xl">
                  <Text className="text-3xl font-bold">Promise Modal</Text>
                  <TextInput placeholder="Name of promise" className="m-1 p-3 border-2 border-gray-200 bg-white w-full" onChangeText={setPromiseName}/>
                  <View className="flex-row items-center justify-center ml-1 my-2">
                     <Text className="text-2xl font-bold mr-2">Days</Text>
                     <View className="flex flex-col items-center border-x-[1px] border-gray-200">
                        <Pressable onPress={() => {if (days != 14) setDays(days + 1)}}><Text className="text-4xl">&#9650;</Text></Pressable>
                        <Text className="text-4xl">{days.toString()}</Text>
                        <Pressable onPress={() => {if (days != 1) setDays(days - 1)}}><Text className="text-4xl">&#9660;</Text></Pressable>
                     </View>
                     <View className="flex flex-col items-center border-x-[1px] border-gray-200 ml-3 mr-1">
                        <Pressable onPress={() => {if (hours != 23) setHours(hours + 1)}}><Text className="text-4xl">&#9650;</Text></Pressable>
                        <Text className="text-4xl">{hours.toString()}</Text>
                        <Pressable onPress={() => {if (hours != 0) setHours(hours - 1)}}><Text className="text-4xl">&#9660;</Text></Pressable>
                     </View>
                     <Text className="text-2xl font-bold">Hours</Text>
                  </View>
                  <Pressable className="border-2 border-black m-1 p-3" onPress={() => handleSubmit()}><Text>Create New Promise</Text></Pressable>
               </View>
            </Modal >
         </View>
      </View >
   )
}
