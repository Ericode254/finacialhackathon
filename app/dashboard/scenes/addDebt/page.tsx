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
import DebtForm from '../mydebts/page';
import { useNewDebt } from '../../hooks/use_new_debt';

    const NewDebtSheet = () => {
    const {isDebtOpen,onDebtClose} = useNewDebt();
    
        return (
        <Sheet open={isDebtOpen} onOpenChange={onDebtClose}>
        <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
            <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-bold text-gray-800">
                New Your Debts
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
                Add your debts .
            </SheetDescription>
            </SheetHeader>
            <DebtForm onSubmit={()=>{}} disabled={false}/>
            {/* Add additional content here if needed */}

        </SheetContent>
        </Sheet>
    )
    }

    export default  NewDebtSheet 
