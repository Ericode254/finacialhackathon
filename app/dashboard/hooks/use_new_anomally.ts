import {create }  from "zustand"


type NewAccountState = {
    isAnomallyDetectionOpen : boolean;
    onAnomallyDetectionOpen: () => void;
    onAnomallyDetectionClose: () => void;
}


export const useNewAnomallyDetection = create<NewAccountState>((set) =>({
    isAnomallyDetectionOpen:false,
    onAnomallyDetectionOpen:() => set({isAnomallyDetectionOpen: true}),
    onAnomallyDetectionClose:() => set({isAnomallyDetectionOpen: false}),

}))