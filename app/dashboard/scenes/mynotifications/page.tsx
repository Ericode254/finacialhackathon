"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { useNewAccount } from '../../hooks/use_new_account';
import AccountForm from '../addAccount/page';
import Notifications from "../notifications/page"
import { useNewNotification } from '../../hooks/use_new_notification';
const NewNotificationSheet = () => {
    const { isNotificationOpen, onNotificationClose } = useNewNotification();

    return (
        <Sheet open={isNotificationOpen} onOpenChange={onNotificationClose}>
            <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="text-xl font-bold text-gray-800">
                        My notifications
                    </SheetTitle>
                    <SheetDescription className="text-sm text-gray-500">
                        See your notifications
                    </SheetDescription>
                </SheetHeader>
                {/* <AccountForm onSubmit={()=>{}} disabled={false}/> */}
                {/* Add additional content here if needed */}

                <Notifications />
            </SheetContent>
        </Sheet>
    )
}

export default NewNotificationSheet
