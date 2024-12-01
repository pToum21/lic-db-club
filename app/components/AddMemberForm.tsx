'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddMemberForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [membershipNumber, setMembershipNumber] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, membershipNumber }),
    })

    if (response.ok) {
      setFirstName('')
      setLastName('')
      setEmail('')
      setMembershipNumber('')
      router.refresh()
    } else {
      alert('Failed to add member. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Member</h2>
      <div>
        <label htmlFor="firstName" className="block mb-1">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-1">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="membershipNumber" className="block mb-1">Membership Number:</label>
        <input
          type="text"
          id="membershipNumber"
          value={membershipNumber}
          onChange={(e) => setMembershipNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Add Member
      </button>
    </form>
  )
}

