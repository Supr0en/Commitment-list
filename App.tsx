import { View, Text } from "react-native";
import React from "react";
import './global.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Promise } from "./src/interfaces";
import PromiseList from "./src/components/PromiseList";
import uuid from "react-native-uuid";
import PromiseModal from "./src/components/PromiseModal";
import { incrementStreak, resetStreak } from "./src/helpers/AsyncStorage";

export default function App() {
   const [promises, setPromises] = React.useState<Promise[]>([
      { id: uuid.v4(), name: 'Write this app', endDate: "2026-10-30" },
      { id: uuid.v4(), name: 'Write a email', endDate: "2026-11-15" },
      { id: uuid.v4(), name: 'Finish assingment 1', endDate: "2026-10-26" }
   ]);
   const [streak, setStreak] = React.useState<string>("");
   const loadStreak = async () => {
      try {
         const promiseStreak = await AsyncStorage.getItem('Promise-streak');
         if (promiseStreak !== null) {
            console.log(promiseStreak)
            setStreak(promiseStreak);
         }
      } catch (error) {
         console.error('Error fetching streak', error);
      }
   }
   const loadPromises = async () => {
      try {
         const storedTodos = await AsyncStorage.getItem('Promise-storage');
         if (storedTodos !== null) {
            setPromises(JSON.parse(storedTodos));
         }
      } catch (error) {
         console.error('Error loading todos', error);
      }
   }
   const checkExpiredPromises = () => {
      promises.forEach((promise) => {
         if (new Date().getTime() < new Date(promise.endDate).getTime()) {
            resetStreak();
         }
      })
   }

   React.useEffect(() => {
      loadPromises();
      loadStreak();
      checkExpiredPromises();
   }, []);

   const updatePromiseState = (data: Promise) => {
      setPromises([...promises, data])
   }

   // TODO: Possible add discard or freeze commitment/promise.
   const updatePromisesState = (data: Promise[]) => {
      setPromises(data);
      updateStreakState(streak);
   }
   const updateStreakState = (streak: string) => {
      incrementStreak(streak);
      setStreak((+streak + 1).toString())
   }

   return (
      <View className="pt-10 px-2">
         <View className='w-full flex-row align-middle p-2 justify-between'>
            <Text className='text-2xl font-extrabold text-blue-950'>Commitment list</Text>
            <Text className='text-2xl font-extrabold text-orange-600'>{streak} &#x1F525;</Text>
         </View>
         <View className="flex flex-col h-[90%] justify-between">
            <PromiseList promises={promises} onUpdate={updatePromisesState} />
            <PromiseModal promises={promises} onSubmit={updatePromiseState} />
         </View>
      </View>
   );
}
