"use client"
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [reminder, setReminder] = useState('');
  const [reminderDate, setReminderDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [remindersList, setRemindersList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReminder = {
      reminder,
      reminderDate,
      email,
    };

    setRemindersList([...remindersList, newReminder]);

    // Call the API route to send the email
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReminder),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data.message);
      } else {
        console.error('Error sending email:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setReminder('');
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">Remind Me Please</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="reminder" className="block text-lg font-medium text-gray-700">Reminder</label>
            <input
              type="text"
              id="reminder"
              name="reminder"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reminderDate" className="block text-lg font-medium text-gray-700">Date & Time</label>
            <DatePicker
              selected={reminderDate}
              onChange={(date) => setReminderDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add Reminder
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-md mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-black text-center mb-4">Your Reminders</h2>
        <ul className="space-y-4">
          {remindersList.map((reminder, index) => (
            <li key={index} className="p-4 bg-gray-50 border text-black border-gray-300 rounded-md">
              <p><strong>Reminder:</strong> {reminder.reminder}</p>
              <p><strong>Time:</strong> {new Date(reminder.reminderDate).toLocaleString()}</p>
              <p><strong>Email:</strong> {reminder.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
