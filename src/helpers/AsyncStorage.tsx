import AsyncStorage from "@react-native-async-storage/async-storage";
import { Promise } from "../interfaces"
import uuid from 'react-native-uuid';

export const loadPromises = async () => {
   try {
      const storedPromises = await AsyncStorage.getItem('Promise-storage');
      if (storedPromises !== null) {
         return JSON.parse(storedPromises);
      }
   } catch (error) {
      console.error('Error loading todos', error);
   }
}

export const savePromises = async (updatedPromises: Promise[]) => {
   try {
      await AsyncStorage.setItem('Promise-storage', JSON.stringify(updatedPromises));
   } catch (error) {
      console.error('Error saving Promises', error);
   }
}

export const createPromise = (name: string, endDate: string) => {
   const newUUID = uuid.v4();
   const newPromise: Promise = {
      id: newUUID,
      name: name,
      endDate: endDate,
   }
   return newPromise;
}

export const confirmPromise = async (id: string) => {
   try {
      const promises = await loadPromises();
      const filteredPromises = promises.filter((item: Promise) => item.id !== id);
      savePromises(filteredPromises);
      return filteredPromises;
   } catch (error) {
      console.error('Error confirm completion of promise', error)
   }
}

export const loadStreak = async () => {
   try {
      const promiseStreak = await AsyncStorage.getItem('Promise-streak');
      if (promiseStreak !== null) {
         console.log(promiseStreak)
         return promiseStreak;
      }
   } catch (error) {
      console.error('Error fetching streak', error);
   }
}
export const incrementStreak = async (curStreak: string) => {
   try {
      AsyncStorage.setItem('Promise-streak', (+curStreak + 1).toString());
   } catch (error) {
      console.error('Error reseting Streak', error);
   }
}

export const resetStreak = async () => {
   try {
      AsyncStorage.setItem('Promise-streak', "0");
   } catch (error) {
      console.error('Error reseting Streak', error);
   }
}
