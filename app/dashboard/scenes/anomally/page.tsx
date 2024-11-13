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

import { useNewAnomallyDetection } from '../../hooks/use_new_anomally';

    const NewAnomallyDetection = () => {
    const {isAnomallyDetectionOpen,onAnomallyDetectionClose} = useNewAnomallyDetection();
    
        return (
        <Sheet open={isAnomallyDetectionOpen} onOpenChange={onAnomallyDetectionClose}>
        <SheetContent className="space-y-6 p-6 rounded-lg bg-white  shadow-lg border border-gray-200">
            <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-bold text-gray-800">
                Anomally Detection
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
               Anomally detection
            </SheetDescription>
            </SheetHeader>
{/* <InvestmentForm onSubmit={()=>{}} disabled={false}/> */}
            {/* Add additional content here if needed */}

        </SheetContent>
        </Sheet>
    )
    }

    export default NewAnomallyDetection
