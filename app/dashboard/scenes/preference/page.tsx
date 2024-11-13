'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [age, setAge] = useState('')
  const [employmentCategory, setEmploymentCategory] = useState('')
  const [accounts, setAccounts] = useState({
    checking: false,
    savings: false,
    investment: false,
    creditCard: false
  })
  const [accountAmounts, setAccountAmounts] = useState({
    checking: '',
    savings: '',
    investment: '',
    creditCard: ''
  })

  const handleAccountChange = (account: keyof typeof accounts) => {
    setAccounts(prev => ({ ...prev, [account]: !prev[account] }))
  }

  const handleAccountAmountChange = (account: keyof typeof accountAmounts, amount: string) => {
    setAccountAmounts(prev => ({ ...prev, [account]: amount }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedAccounts = Object.entries(accounts)
      .filter(([_, isSelected]) => isSelected)
      .map(([account]) => account)
    const preferences = {
      age,
      employmentCategory,
      accounts: selectedAccounts,
      accountAmounts: Object.fromEntries(
        Object.entries(accountAmounts).filter(([account]) => accounts[account as keyof typeof accounts])
      )
    }
    console.log('User preferences:', preferences)
    // Here you would typically send this data to your backend or state management system
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employmentCategory">Employment Category</Label>
            <Select value={employmentCategory} onValueChange={setEmploymentCategory}>
              <SelectTrigger id="employmentCategory">
                <SelectValue placeholder="Select employment category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Accounts</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(accounts).map(([account, isChecked]) => (
                <div key={account} className="flex items-center space-x-2">
                  <Checkbox
                    id={account}
                    checked={isChecked}
                    onCheckedChange={() => handleAccountChange(account as keyof typeof accounts)}
                  />
                  <Label htmlFor={account} className="capitalize">
                    {account.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {Object.entries(accounts).map(([account, isChecked]) => 
            isChecked && (
              <div key={`${account}-amount`} className="space-y-2">
                <Label htmlFor={`${account}-amount`} className="capitalize">
                  {account.replace(/([A-Z])/g, ' $1').trim()} Amount
                </Label>
                <Input
                  id={`${account}-amount`}
                  type="number"
                  placeholder={`Enter ${account} amount`}
                  value={accountAmounts[account as keyof typeof accountAmounts]}
                  onChange={(e) => handleAccountAmountChange(account as keyof typeof accountAmounts, e.target.value)}
                  required
                />
              </div>
            )
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}