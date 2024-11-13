import {create }  from "zustand"


type NewAccountState = {
    isReminderOpen : boolean;
    onReminderOpen: () => void;
    onReminderClose: () => void;
}


export const useNewReminder = create<NewAccountState>((set) =>({
    isReminderOpen:false,
    onReminderOpen:() => set({isReminderOpen: true}),
    onReminderClose:() => set({isReminderOpen: false}),

}))