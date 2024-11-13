"use client"
   import React from 'react'
    import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle
    } from "@/components/ui/sheet"
import { useNewPersonalizedGoal } from '../../hooks/use_new_personalized';



    const NewPersonalizedGoalSheet = () => {
    const {isPersonalizedGoalOpen,onPersonalizedGoalClose} = useNewPersonalizedGoal();
    
        return (
        <Sheet open={isPersonalizedGoalOpen} onOpenChange={onPersonalizedGoalClose}>
        <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
            <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-bold text-gray-800">
                AI powered Personalized Finance Goals Advice
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
               Based on your transactions we suggest these advice 
            </SheetDescription>
            </SheetHeader>
<div>
    
</div>

        </SheetContent>
        </Sheet>
    )
    }

    export default NewPersonalizedGoalSheet
