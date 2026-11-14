import { View, Text, StatusBar } from "react-native";
import React from "react";
import './global.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Commitment } from "./src/interfaces";
import uuid from "react-native-uuid";
import { incrementStreak, resetStreak } from "./src/helpers/AsyncStorage";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CreateCommitmentModal from "./src/components/CreateCommitmentModal";
import CommitmentsList from "./src/components/CommitmentsList";
import ConfirmCommitmentModal from "./src/components/ConfirmCommitmentModal"
export default function App() {
   const [commitments, setCommitments] = React.useState<Commitment[]>([
      { id: uuid.v4(), name: 'Write this app', endDate: "2026-10-30" },
      { id: uuid.v4(), name: 'Write a email', endDate: "2026-11-15" },
      { id: uuid.v4(), name: 'Finish assingment 1', endDate: "2026-10-26" },
   ]);
   const [streak, setStreak] = React.useState<string>("");
   const loadStreak = async () => {
      try {
         const CommitmentStreak = await AsyncStorage.getItem('Commitments-streak');
         if (CommitmentStreak !== null) {
            setStreak(CommitmentStreak);
         }
      } catch (error) {
         console.error('Error fetching streak', error);
      }
   }
   const loadCommitments = async () => {
      try {
         const storedCommitments = await AsyncStorage.getItem('Commitments-storage');
         if (storedCommitments !== null) {
            setCommitments(JSON.parse(storedCommitments));
         }
      } catch (error) {
         console.error('Error loading Commitment', error);
      }
   }
   const checkExpiredCommitments = () => {
      commitments.forEach((commitment) => {
         if (new Date().getTime() < new Date(commitment.endDate).getTime()) {
            resetStreak();
         }
      })
   }

   React.useEffect(() => {
      loadCommitments();
      loadStreak();
      checkExpiredCommitments();
   }, []);

   const updateCommitmentState = (data: Commitment) => {
      setCommitments([...commitments, data])
   }

   const updateCommitmentsState = (commitments: Commitment[], isExpired: boolean) => {
      setCommitments(commitments);
      if (!isExpired) updateStreakState(streak);
   }
   const updateStreakState = (streak: string) => {
      incrementStreak(streak);
      setStreak((+streak + 1).toString())
   }

   return (
      <SafeAreaProvider className="bg-white">
         <SafeAreaView className="bg-white">
            <StatusBar barStyle="dark-content" />
            <View className='w-full flex-row align-middle p-2 bg-white justify-between'>
               <Text className='text-2xl font-extrabold text-blue-950'>Commitment list</Text>
               <Text className='text-2xl font-extrabold text-orange-600'>{streak} &#x1F525;</Text>
            </View>
            <View className="flex flex-col h-[90%] p-2 justify-between bg-white">
               <CommitmentsList commitments={commitments} onUpdate={updateCommitmentsState} />
               <View className="flex-row">
                  <ConfirmCommitmentModal />
                  <CreateCommitmentModal commitments={commitments} onSubmit={updateCommitmentState} />
               </View>
            </View>
         </SafeAreaView>
      </SafeAreaProvider>

   );
}
