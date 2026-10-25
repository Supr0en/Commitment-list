import {View, Text, FlatList} from "react-native";
import type {ItemProps, PromiseListProps} from "../types";
import Timer from "./Timer";

const PromiseItem = ({ name, endDate }: ItemProps) => {
return (
   <View className="p-3 border-black border-2 m-1 flex-row justify-between items-center bg-cyan-500">
      <Text className="color-black">{name}</Text>
      <Timer start={new Date()} end={new Date(endDate)} />
   </View>
)};

export default function PromiseList({ promises }: PromiseListProps) {
   return (
      <FlatList data={promises} renderItem={({ item }) => <PromiseItem name={item.name} endDate={item.endDate} />} />
   )
}
