import {create }  from "zustand"


type NewAccountState = {
    isAccountOpen : boolean;
    onAccountOpen: () => void;
    onAccountClose: () => void;
}


export const useNewAccount = create<NewAccountState>((set) =>({
    isAccountOpen:false,
    onAccountOpen:() => set({isAccountOpen: true}),
    onAccountClose:() => set({isAccountOpen: false}),

}))