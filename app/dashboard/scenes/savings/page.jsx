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
import SavingsForm from "../addSavings/page"

import { useNewSaving } from '../../hooks/use_new_saving';
const SavingsSheet = () => {
    const { isSavingOpen, onSavingClose } = useNewSaving();

    return (
        <Sheet open={isSavingOpen} onOpenChange={onSavingClose}>
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

                <SavingsForm />
            </SheetContent>
        </Sheet>
    )
}

export default SavingsSheet
