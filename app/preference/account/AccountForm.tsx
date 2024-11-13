import React, { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { z } from "zod";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { useAuth } from '@/app/dashboard/provider/auth-provider';
import { useRouter } from 'next/navigation';

// Validation schema
const formSchema = z.object({
    account_number: z.string()
        .min(1, "Account number is required")
        .max(20, "Account number cannot exceed 20 characters"),
    account_type: z.enum(["bank", "mpesa", "cash", "other"], "Select a valid account type"),
    bank_name: z.enum(["kcb", "equity", "family", "worldbank"]).optional(),
    amount: z.string()
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

const ACCOUNT_TYPES = [
    { value: 'bank', label: 'Bank' },
    { value: 'mpesa', label: 'M-Pesa' },
    { value: 'cash', label: 'Cash' },
    { value: 'other', label: 'Other' },
];

const BANKS = [
    { value: 'kcb', label: 'KCB' },
    { value: 'equity', label: 'Equity' },
    { value: 'family', label: 'Family Bank' },
    { value: 'worldbank', label: 'World Bank' },
];

// Check if user has multiple accounts
const checkIfUserHasMultipleAccounts = async (getToken) => {
    try {
        const response = await axios.get("http://localhost:8000/api/accounts/", {
            headers: {
                Authorization: `Token ${getToken()}`,
                "Content-Type": "application/json",
            },
        });
        // If there are multiple accounts, return true
        return response.data && response.data.length > 1;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        toast.error("Failed to verify account status. Please try again.");
        return false;
    }
};

const handleLogin = async (getToken, router) => {
    console.log("Login button clicked");

    // Check if the user has more than one account
    const hasMultipleAccounts = await checkIfUserHasMultipleAccounts(getToken);
    if (hasMultipleAccounts) {
        console.log("User has multiple accounts. Redirecting to dashboard...");
        toast.info("Logging in...");
        router.push("/dashboard");
    } else {
        console.warn("User has one account. Redirecting to account creation.");
        toast.warn("You need at least one account to log in.");
    }
};

const saveAccountToServer = async (data: FormValues, getToken: () => string) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/accounts/",
            {
                user: 2,
                ...data,
            },
            {
                headers: {
                    Authorization: `Token ${getToken()}`,
                    "Content-Type": "application/json",
                },
            }
        );
        toast.success("Account saved successfully!"); // Success toast
    } catch (error) {
        console.error("Error saving bank:", error.response || error);
        toast.error("Failed to save account. Please try again."); // Error toast
    }
};

const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}: Props) => {
    const { getToken } = useAuth();
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = async (values: FormValues) => {
        try {
            await saveAccountToServer(values, getToken);
            onSubmit(values);
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    useEffect(() => {
        // Check if the user has multiple accounts and disable form if necessary
        const checkAccounts = async () => {
            const hasMultipleAccounts = await checkIfUserHasMultipleAccounts(getToken);
            if (hasMultipleAccounts) {
                form.setValue("account_number", "");  // Optionally clear any form values if needed
                form.setValue("account_type", "");    // Optionally clear account type
                form.setValue("amount", "");          // Optionally clear amount
                form.setValue("bank_name", "");       // Optionally clear bank name
            }
        };

        checkAccounts();
    }, [getToken]);

    return (
        <Form {...form}>
            <ToastContainer /> {/* Place the ToastContainer to render toasts */}
            <form className="space-y-4 pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField name="account_number" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-black">Account Number</FormLabel>
                        <FormControl>
                            <Input
                                disabled={disabled}
                                placeholder="Enter account number"
                                className="text-black"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="account_type" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-black">Account Type</FormLabel>
                        <FormControl>
                            <select
                                disabled={disabled}
                                {...field}
                                className="border rounded p-2 w-full text-black"
                            >
                                <option value="">Select an account type</option>
                                {ACCOUNT_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="bank_name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-black">Bank Name</FormLabel>
                        <FormControl>
                            <select
                                disabled={disabled || form.watch("account_type") !== "bank"}
                                {...field}
                                className="border rounded p-2 w-full text-black"
                            >
                                <option value="">Select a bank</option>
                                {BANKS.map((bank) => (
                                    <option key={bank.value} value={bank.value}>
                                        {bank.label}
                                    </option>
                                ))}
                            </select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="amount" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-black">Amount</FormLabel>
                        <FormControl>
                            <Input
                                disabled={disabled}
                                placeholder="e.g. 1000"
                                className="text-black"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex items-center gap-4 pt-4">
                    <Button className="w-full" disabled={disabled}>
                        {id ? "Save changes" : "Create account"}
                    </Button>
                    <Button
                        onClick={() => handleLogin(getToken, router)}
                        className="w-full"
                        disabled={disabled}
                    >
                        Login
                    </Button>
                    {onDelete && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onDelete}
                            className="w-full"
                            disabled={disabled}
                        >
                            <Trash className="size-4 mr-2" />
                            Delete account
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default AccountForm;
