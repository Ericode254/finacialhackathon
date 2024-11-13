import React from 'react';
import { Trash } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { z } from "zod";

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
import { useAuth } from '../../provider/auth-provider';

// Validation schema
const formSchema = z.object({
    account_number: z.string()
        .min(1, "Account number is required")
        .max(20, "Account number cannot exceed 20 characters"),
    account_type: z.enum(["bank", "mpesa", "cash", "other"], "Select a valid account type"),
    bank_name: z.enum(["kcb", "equity", "family", "worldbank"]).optional(),
    amount: z.string()
});

// Define the form value type based on the schema
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

// Function to handle API call
const saveAccountToServer = async (data: FormValues, getToken: () => string) => {
    console.log("Data to send to server:", data); // Log the form data

    try {
        const response = await axios.post(
            "http://localhost:8000/api/accounts/",
            {
                user: 1,
                ...data,
            },
            {
                headers: {
                    Authorization: `Token ${getToken()}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Bank saved:", response.data);
    } catch (error) {
        console.error("Error saving bank:", error.response || error); // Log detailed error response
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

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const accountType = form.watch("account_type");

    const handleSubmit = async (values: FormValues) => {
        try {
            await saveAccountToServer(values, getToken); // Save account to server
            onSubmit(values); // Trigger onSubmit callback
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    // Log validation errors
    React.useEffect(() => {
        const errors = form.formState.errors;
        if (Object.keys(errors).length > 0) {
            console.log("Validation errors:", errors); // Log any validation errors
            Object.keys(errors).forEach((field) => {
                console.log(`${field} validation error:`, errors[field]?.message);
            });
        }
    }, [form.formState.errors]);

    return (
        <Form {...form}>
            <form className="space-y-4 pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
                {/* Account Number Field */}
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

                {/* Account Type Field */}
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

                {/* Bank Name Field */}
                <FormField name="bank_name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-black">Bank Name</FormLabel>
                        <FormControl>
                            <select
                                disabled={disabled || accountType !== "bank"}
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

                {/* Amount Field */}
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

                {/* Submit and Delete Buttons */}
                <div className="flex items-center gap-4 pt-4">
                    <Button className="w-full" disabled={disabled}>
                        {id ? "Save changes" : "Create account"}
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
