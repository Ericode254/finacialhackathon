import {create }  from "zustand"


type NewAccountState = {
    isGoalOpen : boolean;
    onGoalOpen: () => void;
    onGoalClose: () => void;
}


export const useNewGoal = create<NewAccountState>((set) =>({
    isGoalOpen:false,
    onGoalOpen:() => set({isGoalOpen: true}),
    onGoalClose:() => set({isGoalOpen: false}),

}))