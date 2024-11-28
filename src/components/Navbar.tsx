'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  const { status, data: session } = useSession()

  console.log(session)

  return (
    <div className="flex flex-row justify-between items-center bg-blue-900 px-8 py-4">
      <Link href="/" className="text-white text-lg font-bold">
        MongoDB CRUD
      </Link>
      <Link
        href="/addTopic"
        className="bg-green-500 text-black font-bold px-4 py-2 rounded-md"
      >
        Add Topic
      </Link>
      <div className="flex gap-4">
        {status === 'authenticated' ? (
          <>
            <div className="flex gap-2 items-center">
              <Image
                className="rounded-full"
                src={session?.user?.image ?? '/default-avatar.png'}
                width={40}
                height={40}
                alt={session?.user?.name ?? 'user'}
              />
              <span className="text-white font-bold">
                {session?.user?.name ?? 'user'}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:text-yellow-400 text-white px-4 py-2 rounded-md text-lg font-bold"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-yellow-400 hover:bg-red-600 text-white px-4 py-2 rounded-md text-lg font-bold"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
