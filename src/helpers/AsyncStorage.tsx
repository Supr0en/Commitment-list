import AsyncStorage from "@react-native-async-storage/async-storage";
import { Promise } from "../interfaces"
import uuid from 'react-native-uuid';

export const loadPromises = async () => {
   try {
      const storedPromises = await AsyncStorage.getItem('Promise');
      if (storedPromises !== null) {
         return JSON.parse(storedPromises);
      }
   } catch (error) {
      console.error('Error loading todos', error);
   }
}

export const savePromises = async (updatedPromises: Promise[]) => {
   try {
      await AsyncStorage.setItem('Promise', JSON.stringify(updatedPromises));
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
