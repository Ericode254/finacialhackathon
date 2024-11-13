"use client"

import NewAccountSheet from "../scenes/myaccounts/page"
import {useMountedState}  from "react-use"
import NewNotificationSheet from "../scenes/mynotifications/page"

export const NotificationProvider = () =>{

    const isMounted  = useMountedState();
    if (!isMounted) return null;

     return (
        <>
  
         <NewNotificationSheet />
        </>
     )
}