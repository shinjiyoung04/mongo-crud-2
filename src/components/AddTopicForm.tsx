'use client'

import { createTopic } from '@/actions/topicActions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddTopicForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createTopic(title, description)
      router.push('/')
    } catch (error) {
      console.error('토픽 생성 중 오류:', error)
      alert('토픽 생성 중 오류 발생')
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-slate-500 p-4"
        placeholder="Topic Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="border border-slate-500 p-4 h-32"
        placeholder="Topic Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button
        className="bg-yellow-200 text-black font-bold px-6 py-3 w-fit rounded-md"
        type="submit"
      >
        Add Topic
      </button>
    </form>
  )
}
