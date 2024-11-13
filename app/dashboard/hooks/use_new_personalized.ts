import {create }  from "zustand"


type NewAccountState = {
    isPersonalizedGoalOpen : boolean;
    onPersonalizedGoalOpen: () => void;
    onPersonalizedGoalClose: () => void;
}


export const useNewPersonalizedGoal = create<NewAccountState>((set) =>({
    isPersonalizedGoalOpen:false,
    onPersonalizedGoalOpen:() => set({isPersonalizedGoalOpen: true}),
    onPersonalizedGoalClose:() => set({isPersonalizedGoalOpen: false}),

}))