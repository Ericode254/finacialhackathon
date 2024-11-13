import {create }  from "zustand"


type NewAccountState = {
    isSavingOpen : boolean;
    onSavingOpen: () => void;
    onSavingClose: () => void;
}


export const useNewSaving= create<NewAccountState>((set) =>({
    isSavingOpen:false,
    onSavingOpen:() => set({isSavingOpen: true}),
    onSavingClose:() => set({isSavingOpen: false}),

}))