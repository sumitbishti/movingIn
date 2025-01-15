'use client'

import { useState } from 'react'

export default function WhatsAppForm() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Enhanced phone number validation
    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      setError('Please enter a valid phone number with country code')
      return
    }

    // Use the base URL without query parameters
    const websiteUrl = 'https://movein-neon.vercel.app/about'
    
    // Create a more engaging message
    const message = `🎉 Exclusive Special Offer!\n\nCheck out this amazing deal! Click here to learn more:\n${websiteUrl}`
    
    // Create WhatsApp sharing URL - use api.whatsapp.com instead of web.whatsapp.com
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber.replace(/\D/g, '')}&text=${encodeURIComponent(message)}`
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
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