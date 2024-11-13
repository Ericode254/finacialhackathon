"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, MenuItem, Select } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import axios from "axios";
import { useAuth } from "../../provider/auth-provider";

// Define TypeScript interface for accounts
interface Account {
    id: string;
    name: string;
    number: string;
}

// Define validation schema
const formSchema = z.object({
    transaction_type: z.enum(["Income", "Expense"]),
    category: z.string().nonempty("Category is required"),
    amount: z.number().positive("Amount must be positive").min(0.01, "Minimum amount is 0.01"),
    description: z.string().max(50, "Description should be less than 50 characters").optional(),
    account_number: z.string().nonempty("Account number is required"),
});

const defaultValues = {
    transaction_type: "Income",
    category: "",
    amount: 0,
    description: "",
    account_number: "",
};

const INCOME_CATEGORIES = [
    { value: "salary", label: "Salary" },
    { value: "investments", label: "Investments" },
];

const EXPENSE_CATEGORIES = [
    { value: "bills", label: "Bills" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
];

const transactionCategoryOptions = [
    { label: "Income", value: "Income" },
    { label: "Expense", value: "Expense" },
];

const TransactionForm: React.FC<{ onSubmit: (data: any) => void; disabled?: boolean }> = ({ onSubmit, disabled }) => {
    const { getToken } = useAuth();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const [categoryOptions, setCategoryOptions] = useState(INCOME_CATEGORIES);
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const transactionType = form.watch("transaction_type");
        setCategoryOptions(transactionType === "Income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES);
        form.setValue("category", "");
    }, [form.watch("transaction_type")]);

    // Fetch accounts on mount
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get<Account[]>("http://localhost:8000/api/accounts/", {
                    headers: { Authorization: `Token ${getToken()}` },
                });
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, []);

    const handleFormSubmit = async (data: any) => {
        try {
            const formattedData = {
                account_number: data.account_number,
                amount: parseFloat(data.amount),
                transaction_type: data.transaction_type.toLowerCase(),
                category: data.category.toLowerCase(),
                description: data.description,
            };

            const response = await axios.post(
                "http://localhost:8000/api/transactions/",
                formattedData,
                {
                    headers: {
                        Authorization: `Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Transaction saved:", response.data);
            onSubmit(formattedData);
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-4 text-gray-800 pt-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
                <FormField name="transaction_type" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Transaction Type</FormLabel>
                        <FormControl>
                            <Select
                                placeholder="Select Income or Expense"
                                options={transactionCategoryOptions}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="category" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                            <Select
                                placeholder="Select a Category"
                                options={categoryOptions}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="amount" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="0.01"
                                disabled={disabled}
                                placeholder="e.g., 1000"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="description" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input
                                disabled={disabled}
                                placeholder="Optional description"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="account_number" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                displayEmpty
                                disabled={disabled}
                            >
                                <MenuItem value="" disabled>Select Account</MenuItem>
                                {accounts.map((account) => (
                                    <MenuItem key={account.id} value={account.id}>
                                        {account.name} - {account.number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={disabled}
                >
                    Submit Transaction
                </Button>
            </form>
        </Form>
    );
};

export default TransactionForm;
