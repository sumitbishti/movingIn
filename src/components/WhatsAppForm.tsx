'use client'

import { useState } from 'react'

export default function WhatsAppForm() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Basic phone number validation
    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      setError('Please enter a valid phone number with country code')
      return
    }

    // The URL to be shared (your deployed website URL)
    const websiteUrl = 'https://movein-neon.vercel.app/about'
    
    // Create the message with the website URL
    const message = `Check out this amazing offer! ${websiteUrl}`
    
    // Create WhatsApp sharing URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp Number (with country code)
        </label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder="+1234567890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Share to WhatsApp
      </button>
    </form>
  )
}
