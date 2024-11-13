
"use client"

import NewAccountSheet from "../scenes/myaccounts/page"
import {useMountedState}  from "react-use"
import NewNotificationSheet from "../scenes/mynotifications/page"
import NewGoalSheet from "../scenes/addgoal/page"
import NewDebtSheet from "../scenes/addDebt/page"
import ProfileSheet from "../scenes/profile/page"

export const ProfileProvider = () =>{

    const isMounted  = useMountedState();
    if (!isMounted) return null;

     return (
        <>
  
         <ProfileSheet />
        </>
     )
}