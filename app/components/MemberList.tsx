'use client'

import { useState } from 'react'
import { Member } from '@prisma/client'

export default function MemberList({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers] = useState(initialMembers)
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleEdit = async (id: number, updates: Partial<Member>) => {
    const response = await fetch(`/api/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })

    if (response.ok) {
      setMembers(members.map(member => 
        member.id === id ? { ...member, ...updates } : member
      ))
      setEditingId(null)
    } else {
      alert('Failed to update member. Please try again.')
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Member List</h2>
      <ul className="space-y-4">
        {members.map(member => (
          <li key={member.id} className="border p-4 rounded">
            {editingId === member.id ? (
              <EditMemberForm member={member} onSave={handleEdit} onCancel={() => setEditingId(null)} />
            ) : (
              <div>
                <p><strong>Name:</strong> {member.firstName} {member.lastName}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Membership Number:</strong> {member.membershipNumber}</p>
                <button 
                  onClick={() => setEditingId(member.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function EditMemberForm({ member, onSave, onCancel }: { 
  member: Member, 
  onSave: (id: number, updates: Partial<Member>) => void, 
  onCancel: () => void 
}) {
  const [firstName, setFirstName] = useState(member.firstName)
  const [lastName, setLastName] = useState(member.lastName)
  const [email, setEmail] = useState(member.email)
  const [membershipNumber, setMembershipNumber] = useState(member.membershipNumber)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(member.id, { firstName, lastName, email, membershipNumber })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full px-2 py-1 border rounded"
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full px-2 py-1 border rounded"
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-2 py-1 border rounded"
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={membershipNumber}
        onChange={(e) => setMembershipNumber(e.target.value)}
        className="w-full px-2 py-1 border rounded"
        placeholder="Membership Number"
        required
      />
      <div>
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </form>
  )
}

