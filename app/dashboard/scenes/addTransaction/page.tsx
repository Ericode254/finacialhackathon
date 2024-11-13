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

    const NewAccountSheet = () => {
    const {isOpen,onClose} = useNewAccount();
    
        return (
        <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
            <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-bold text-gray-800">
                New Account
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
                Create a new account to track your transaction
            </SheetDescription>
            </SheetHeader>
            <TransactionForm onSubmit={()=>{}} disabled={false}/>
            {/* Add additional content here if needed */}

        </SheetContent>
        </Sheet>
    )
    }

    export default NewAccountSheet
