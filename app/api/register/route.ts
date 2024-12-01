import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password, // Note: In a real application, you should hash the password
      },
    })
    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Username already exists' }, { status: 400 })
  }
}

