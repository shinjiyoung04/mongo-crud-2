'use client'

import { deleteTopic } from '@/actions/topicActions'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBtn({ id }: { id: string }) {
  async function removeTopic() {
    const confirmed = confirm(`${id} - 이 토픽을 지울까요?`)
    if (confirmed) {
      try {
        await deleteTopic(id)
      } catch (error) {
        console.error('삭제 중 오류 발생: ', error)
        alert('삭제 중 오류 발생')
      }
    }
  }

  return (
    <button className="text-red-500" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
    </button>
  )
}
