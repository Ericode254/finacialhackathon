import {create }  from "zustand"


type NewAccountState = {
    isInvestmentOpen : boolean;
    onInvestmentOpen: () => void;
    onInvestmentClose: () => void;
}


export const useNewInvestment = create<NewAccountState>((set) =>({
    isInvestmentOpen:false,
    onInvestmentOpen:() => set({isInvestmentOpen: true}),
    onInvestmentClose:() => set({isInvestmentOpen: false}),

}))