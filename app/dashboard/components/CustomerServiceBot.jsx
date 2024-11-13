import React from 'react'
import { useState } from 'react';
const CustomerServiceBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
             
        <div className="fixed bottom-20 right-6 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded ${
                    message.type === "user" 
                      ? "bg-emerald-600" 
                      : "bg-gray-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-700"
          >
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-black-100"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
    
    </div>
  )
}

export default CustomerServiceBot