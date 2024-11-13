'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/auth-provider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FinancialGoalForm() {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    amount_needed: '',
    duration_weeks: '',
    description: '',
    goal_type: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, goal_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const financialGoalData = {
      amount_needed: parseFloat(formData.amount_needed),
      duration_weeks: parseInt(formData.duration_weeks, 10),
      description: formData.description,
      goal_type: formData.goal_type,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/financial-goals/',
        financialGoalData,
        {
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        }
      );
      console.log('Financial Goal created successfully:', response.data);
      // Reset the form after successful submission
      setFormData({
        amount_needed: '',
        duration_weeks: '',
        description: '',
        goal_type: '',
      });
    } catch (error) {
      console.error('Error creating financial goal:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Financial Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount_needed">Amount Needed</Label>
              <Input
                id="amount_needed"
                name="amount_needed"
                type="number"
                placeholder="Enter amount"
                value={formData.amount_needed}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration_weeks">Duration (weeks)</Label>
              <Input
                id="duration_weeks"
                name="duration_weeks"
                type="number"
                placeholder="Enter duration in weeks"
                value={formData.duration_weeks}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                maxLength="255"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal_type">Goal Type</Label>
              <Select value={formData.goal_type} onValueChange={handleSelectChange}>
                <SelectTrigger id="goal_type">
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (e.g., House)</SelectItem>
                  <SelectItem value="luxury">Luxury (e.g., Car)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardFooter>
              <Button className="w-full" type="submit">Create Goal</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
