"use client"

import { useMountedState } from "react-use"
import TransactionSheet from "../scenes/mytransactions/page"

export const SheetProvider = () => {
    const isMounted = useMountedState()
    if (!isMounted) return null

    const accountOptions = [
        { label: 'Checking Account', value: 'checking' },
        { label: 'Savings Account', value: 'savings' },
        { label: 'Credit Card', value: 'credit' },
    ]

    const categoryOptions = [
        { label: 'Groceries', value: 'groceries' },
        { label: 'Rent', value: 'rent' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Entertainment', value: 'entertainment' },
        // Add more categories as needed
    ]



    return (
        <>
            <TransactionSheet 
               
                accountOptions={accountOptions} 
                categoryOptions={categoryOptions} 
            />
        </>
    )
}
