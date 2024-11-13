import {create }  from "zustand"


type NewAccountState = {
    isDebtOpen : boolean;
    onDebtOpen: () => void;
    onDebtClose: () => void;
}


export const useNewDebt = create<NewAccountState>((set) =>({
    isDebtOpen:false,
    onDebtOpen:() => set({isDebtOpen: true}),
    onDebtClose:() => set({isDebtOpen: false}),

}))