import {create }  from "zustand"


type NewAccountState = {
    isNotificationOpen : boolean;
    onNotificationOpen: () => void;
    onNotificationClose: () => void;
}


export const useNewNotification = create<NewAccountState>((set) =>({
    isNotificationOpen:false,
    onNotificationOpen:() => set({isNotificationOpen: true}),
    onNotificationClose:() => set({isNotificationOpen: false}),

}))