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
import { useNewGoal } from '../../hooks/use_new_goal';
import GoalForm from '../mygoals/page';
import FinancialGoalForm from '../goals/page';

    const NewGoalSheet = () => {
    const {isGoalOpen,onGoalClose} = useNewGoal();
    
        return (
        <Sheet open={isGoalOpen} onOpenChange={onGoalClose}>
        <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
            <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-bold text-gray-800">
                New Goal Information
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
               Create a new Financial Goal You want to achieve
            </SheetDescription>
            </SheetHeader>
            <FinancialGoalForm />
            {/* Add additional content here if needed */}

        </SheetContent>
        </Sheet>
    )
    }

    export default NewGoalSheet
