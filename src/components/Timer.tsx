import {TimerProps} from "../types";
import React from "react";
import { View, Text } from "react-native";

export default function Timer({ start, end }: TimerProps) {
   const [timeLeft, setTimeLeft] = React.useState(end.getTime() -
      start.getTime());

   React.useEffect(() => {
      const interval = setInterval(() => {
         setTimeLeft(end.getTime() - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
   }, [end, start]);

   const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
   const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 *
      60 * 60));
   const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 *
      60));
   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

   return (
      <View>
         {days <= 0 ? (<Text className="color-red-500 font-bold">{hours}h:{minutes}m:{seconds}s</Text>) : (<Text className="color-green-100 font-bold">{days}d:{hours}h:{minutes}m</Text>)}
      </View>
   );
};

