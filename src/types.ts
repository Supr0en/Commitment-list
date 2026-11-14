import { Commitment } from "./interfaces";
import * as ImagePicker from 'expo-image-picker';

export type ItemProps = {
   id: string, name: string, endDate: string, onUpdate: (data: Commitment, isExpired: boolean) => void,
};
export type CommitmentListProps = {
   commitments: Commitment[], onUpdate: (data: Commitment[], isExpired: boolean) => void,
};
export type TimerProps = { start: Date, end: Date };

export type CommitmentPromisePackage = {
   commitmentName: string,
   imageDescription: string,
   image: ImagePicker.ImagePickerAsset
}
