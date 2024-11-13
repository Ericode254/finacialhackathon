
"use client"

import NewAccountSheet from "../scenes/myaccounts/page"
import {useMountedState}  from "react-use"
import NewNotificationSheet from "../scenes/mynotifications/page"
import NewGoalSheet from "../scenes/addgoal/page"
import NewDebtSheet from "../scenes/addDebt/page"

export const DebtProvider = () =>{

    const isMounted  = useMountedState();
    if (!isMounted) return null;

     return (
        <>
  
         <NewDebtSheet />
        </>
     )
}