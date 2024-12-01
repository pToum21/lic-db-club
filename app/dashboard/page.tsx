import { getMembers } from '../lib/prisma'
import MemberList from '../components/MemberList'
import AddMemberForm from '../components/AddMemberForm'

export default async function Dashboard() {
  const members = await getMembers()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Membership Dashboard</h1>
      <AddMemberForm />
      <MemberList initialMembers={members} />
    </div>
  )
}

