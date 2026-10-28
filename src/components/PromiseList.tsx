import { View, Text, FlatList, Pressable } from "react-native";
import type { ItemProps, PromiseListProps } from "../types";
import Timer from "./Timer";
import React from 'react';
import { confirmPromise } from "../helpers/AsyncStorage";

const PromiseItem = ({ id, name, endDate, onUpdate }: ItemProps) => {
   const handlePromiseUpdate = async () => {
      try {
         const updatedPromises = await confirmPromise(id)
         onUpdate(updatedPromises);
      } catch (error) {
         console.error('handling promise update', error)
      }
   }
   const [confirmMenu, setConfirmMenu] = React.useState<boolean>(false);
   return (
      <Pressable onLongPress={() => setConfirmMenu(!confirmMenu)} >
         <View className="p-3 border-black border-2 m-1 flex-row justify-between items-center bg-cyan-500">
            {confirmMenu == true ?
               (<Pressable onPress={() => handlePromiseUpdate()}><Text>Commitment done?</Text></Pressable>)
               :
               (<><Text className="color-black">{name}</Text>
                  <Timer start={new Date()} end={new Date(endDate)} /></>)
            }
         </View>
      </Pressable>
   )
};

export default function PromiseList({ promises, onUpdate }: PromiseListProps) {
   return (
      <FlatList data={promises} renderItem={({ item }) => <PromiseItem id={item.id} name={item.name} endDate={item.endDate} onUpdate={onUpdate} />} />
   )
}
