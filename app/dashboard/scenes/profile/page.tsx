"use client"

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { useNewTransaction } from '../../hooks/use_new_transaction'; // Adjust if necessary
import TransactionForm from '../transactionForm/page';
import Profile from './Profile';
import { useNewProfile } from '../../hooks/use_new_profile';



const ProfileSheet = () => {

    const { isOpen, onClose } = useNewProfile();

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className=" p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-900">
                <SheetHeader className="border-b ">
                    <SheetTitle className="text-xl font-bold text-gray-100">
                        Your Profile
                    </SheetTitle>
                    <SheetDescription className="text-sm text-gray-100">
                       This screen contains your profile details 
                    </SheetDescription>
                </SheetHeader>

                {/* <TransactionForm
                    onSubmit={() => { }} disabled={false}
                /> */}
                <Profile />

            </SheetContent>
        </Sheet>
    )
}

export default ProfileSheet;
