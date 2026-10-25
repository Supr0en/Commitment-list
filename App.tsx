import { View, Text } from "react-native";
import React from "react";
import './global.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Promise } from "./src/interfaces";
import PromiseList from "./src/components/PromiseList";
import uuid from "react-native-uuid";
import PromiseModal from "./src/components/PromiseModal";

export default function App() {
   const [promises, setPromises] = React.useState<Promise[]>([
      { id: uuid.v4(), name: 'Write this app', endDate: "2026-10-30" },
      { id: uuid.v4(), name: 'Write a email', endDate: "2026-11-15" },
      { id: uuid.v4(), name: 'Finish assingment 1', endDate: "2026-10-26" }
   ]);

   React.useEffect(() => {
      loadPromises();
   }, []);

   const loadPromises = async () => {
      try {
         const storedTodos = await AsyncStorage.getItem('todos');
         if (storedTodos !== null) {
            setPromises(JSON.parse(storedTodos));
         }
      } catch (error) {
         console.error('Error loading todos', error);
      }
   }
   const updatePromiseState = (data: Promise) => {
      setPromises([...promises, data])
   }

   return (
      <View className="pt-10 px-2">
         <View className='w-full flex-row align-middle p-2 justify-between'>
            <Text className='text-2xl font-extrabold text-blue-950'>Commitment list</Text>
            <Text className='text-2xl font-extrabold text-orange-600'>1 &#x1F525;</Text>
         </View>
         <View className="flex flex-col h-[90%] justify-between">
            <PromiseList promises={promises} />
            <PromiseModal promises={promises} onSubmit={updatePromiseState} />
         </View>
      </View>
   );
}
