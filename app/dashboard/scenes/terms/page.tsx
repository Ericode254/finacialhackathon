'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Component() {
  const [isOpen, setIsOpen] = useState(true)
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    if (accepted) {
      setIsOpen(false)
      // Here you would typically send this acceptance to your backend
      console.log('Terms and conditions accepted')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read and accept our Terms and Conditions to continue.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              Welcome to our Finance Management App. By using our service, you agree to these terms. Please read them carefully.
            </p>
            
            <h2 className="text-lg font-semibold">2. Use of Service</h2>
            <p>
              Our service is designed to help you manage your finances. You must provide accurate information and keep your account secure.
            </p>
            
            <h2 className="text-lg font-semibold">3. Privacy</h2>
            <p>
              We take your privacy seriously. Please refer to our Privacy Policy for information on how we collect, use, and share your data.
            </p>
            
            <h2 className="text-lg font-semibold">4. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
            
            <h2 className="text-lg font-semibold">5. Limitation of Liability</h2>
            <p>
              We strive to provide accurate information, but we cannot guarantee its completeness or reliability. We will not be liable for any losses or damages arising from your use of our service.
            </p>
            
            <h2 className="text-lg font-semibold">6. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. We will notify you of any significant changes. Your continued use of our service after such modifications constitutes your acceptance of the new terms.
            </p>
            
            <h2 className="text-lg font-semibold">7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
            
            <h2 className="text-lg font-semibold">8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </div>
        </ScrollArea>
        <DialogFooter className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="accept" checked={accepted} onCheckedChange={(checked) => setAccepted(checked as boolean)} />
            <label
              htmlFor="accept"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions
            </label>
          </div>
          <Button onClick={handleAccept} disabled={!accepted} className="w-full">
            Accept and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}