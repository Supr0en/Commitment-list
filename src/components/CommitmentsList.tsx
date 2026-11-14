import { View, Text, FlatList, Pressable } from "react-native";
import type { ItemProps, CommitmentListProps } from "../types";
import Timer from "./Timer";
import React from 'react';
import { confirmCommitment } from "../helpers/AsyncStorage";
import ConfirmCommitmentModal from "./ConfirmCommitmentModal";

const CommitmentItem = ({ id, name, endDate, onUpdate }: ItemProps) => {
   const [confirmMenu, setConfirmMenu] = React.useState<boolean>(false);
   const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

   const handleCommitmentUpdate = async () => {
      try {
         const isExpired = new Date().getTime() > new Date(endDate).getTime();
         const updatedCommitments = await confirmCommitment(id);
         onUpdate(updatedCommitments, isExpired);
      }
      catch (error) {
         console.error('handling promise update', error)
      }
   }
   const handleConfirmMenu = () => {
      setConfirmMenu(!confirmMenu);
   };

   React.useEffect(() => {
      if (confirmMenu) {
         timerRef.current = setTimeout(() => {
            setConfirmMenu(false);
            timerRef.current = null;
         }, 7000);
      }

      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
         }
      };
   }, [confirmMenu]);


   return (
      <Pressable onLongPress={() => handleConfirmMenu()} >
         <View className="p-3 border-black border-2 m-1 flex-row justify-between items-center bg-cyan-500 rounded-2xl">
            {confirmMenu == true ?
               (<Pressable onPress={() => handleCommitmentUpdate()}><Text>Commitment done?</Text></Pressable>)
               :
               (<><Text className="text-black text-clip w-[75%]">{name}</Text>
                  <Timer start={new Date()} end={new Date(endDate)} /></>)
            }
         </View>
      </Pressable>
   )
};

export default function CommitmentList({ commitments, onUpdate }: CommitmentListProps) {
   return (
      <View>
         <FlatList data={commitments} renderItem={({ item }) => <CommitmentItem id={item.id} name={item.name} endDate={item.endDate} onUpdate={onUpdate} />} />
      </View>
   )
}
