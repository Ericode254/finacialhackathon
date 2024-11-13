"use client"
   import React from 'react'
    import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle
    } from "@/components/ui/sheet"
import { useNewInvestment } from '../../hooks/use_new_investements';



    const NewInvestmentSheet = () => {
    const {isInvestmentOpen,onInvestmentClose} = useNewInvestment();
    
        return (
        <Sheet open={isInvestmentOpen} onOpenChange={onInvestmentClose}>
        <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
            <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-bold text-gray-800">
                You can Investment in this 
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
                Create a new Investment to track your transaction
            </SheetDescription>
            </SheetHeader>
<div>
    
</div>

        </SheetContent>
        </Sheet>
    )
    }

    export default NewInvestmentSheet
