'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/auth-provider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the date picker

export default function SavingsForm() {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    savings_amount: '',
    savings_type: '',
    target_date: '',
    deposit_frequency: 'monthly',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, target_date: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savingsData = {
      savings_amount: parseFloat(formData.savings_amount),
      savings_type: formData.savings_type,
      target_date: formData.target_date,
      deposit_frequency: formData.deposit_frequency,
      description: formData.description,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/savings/',  // Assuming the endpoint to save savings data
        savingsData,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );
      console.log('Savings goal created successfully:', response.data);
      // Reset the form after successful submission
      setFormData({
        savings_amount: '',
        savings_type: '',
        target_date: '',
        deposit_frequency: 'monthly',
        description: '',
      });
    } catch (error) {
      console.error('Error creating savings goal:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Savings Amount */}
            <div className="space-y-2">
              <Label htmlFor="savings_amount">Savings Amount</Label>
              <Input
                id="savings_amount"
                name="savings_amount"
                type="number"
                placeholder="Enter savings amount"
                value={formData.savings_amount}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Savings Type */}
            <div className="space-y-2">
              <Label htmlFor="savings_type">Savings Type</Label>
              <Select value={formData.savings_type} onValueChange={(value) => handleSelectChange(value, 'savings_type')}>
                <SelectTrigger id="savings_type">
                  <SelectValue placeholder="Select savings type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency_fund">Emergency Fund</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Date */}
            <div className="space-y-2">
              <Label htmlFor="target_date">Target Date</Label>
              <DatePicker
                selected={formData.target_date}
                onChange={handleDateChange}
                placeholderText="Select target date"
                required
                className="input-field" // Add a class for styling if needed
              />
            </div>

            {/* Deposit Frequency */}
            <div className="space-y-2">
              <Label htmlFor="deposit_frequency">Deposit Frequency</Label>
              <Select
                value={formData.deposit_frequency}
                onValueChange={(value) => handleSelectChange(value, 'deposit_frequency')}
              >
                <SelectTrigger id="deposit_frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes/Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Enter additional notes"
                value={formData.description}
                onChange={handleInputChange}
                maxLength="255"
              />
            </div>

            {/* Submit Button */}
            <CardFooter>
              <Button className="w-full" type="submit">Save Savings</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
