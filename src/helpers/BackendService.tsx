import { CommitmentPromisePackage } from "../types";

export const CommitmentCompletion = async (CommitmentPackage: CommitmentPromisePackage) => {
   const image = CommitmentPackage.image;
   if (!image) return;
   const promisePackage = new FormData();
   const imageBlob = {
      uri: image.uri,
      name: image.fileName ?? 'photo.jpg',
      type: image.mimeType ?? 'image/jpeg',
   } as unknown as Blob;

   promisePackage.append('photo', imageBlob)
   promisePackage.append('commitmentName', CommitmentPackage.commitmentName);
   promisePackage.append('imageDescrition', CommitmentPackage.imageDescription);

   try {
      const response = await fetch('placeholder', {
         method: 'POST',
         body: promisePackage,
      });
      const result = await response.json();
      console.log('Result', result)
   } catch (error) {
      console.error('Something whent wrong Completing commitment', error)
   }
}
