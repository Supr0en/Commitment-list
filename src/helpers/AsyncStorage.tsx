import AsyncStorage from "@react-native-async-storage/async-storage";
import { Commitment } from "../interfaces"
import uuid from 'react-native-uuid';

export const loadCommitments = async () => {
   try {
      const storedCommitments = await AsyncStorage.getItem('Commitment-storage');
      if (storedCommitments !== null) {
         return JSON.parse(storedCommitments);
      }
   } catch (error) {
      console.error('Error loading Commitments', error);
   }
}

export const saveCommitments = async (updatedCommitments: Commitment[]) => {
   try {
      await AsyncStorage.setItem('Commitment-storage', JSON.stringify(updatedCommitments));
   } catch (error) {
      console.error('Error saving Commitments', error);
   }
}

export const createCommitment = (name: string, endDate: string) => {
   const newUUID = uuid.v4();
   const newCommitment: Commitment = {
      id: newUUID,
      name: name,
      endDate: endDate,
   }
   return newCommitment;
}

export const confirmCommitment = async (id: string) => {
   try {
      const commitments = await loadCommitments();
      const filteredCommitments = commitments.filter((item: Commitment) => item.id !== id);
      saveCommitments(filteredCommitments);
      return filteredCommitments;
   } catch (error) {
      console.error('Error confirm completion of commitments', error)
   }
}

export const loadStreak = async () => {
   try {
      const commitmentsStreak = await AsyncStorage.getItem('Commitments-streak');
      if (commitmentsStreak !== null) {
         console.log(commitmentsStreak)
         return commitmentsStreak;
      }
   } catch (error) {
      console.error('Error fetching streak', error);
   }
}
export const incrementStreak = async (curStreak: string) => {
   try {
      AsyncStorage.setItem('Commitments-streak', (+curStreak + 1).toString());
   } catch (error) {
      console.error('Error incrementing Streak', error);
   }
}

export const resetStreak = async () => {
   try {
      AsyncStorage.setItem('Commitments-streak', "0");
   } catch (error) {
      console.error('Error reseting Streak', error);
   }
}
