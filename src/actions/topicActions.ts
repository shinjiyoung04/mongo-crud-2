'use server'

import { convertDocToObj } from '@/libs/helpers'
import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { revalidatePath } from 'next/cache'

// 1. Create Topic
export async function createTopic(title: string, description: string) {
  try {
    await connectMongoDB()
    const doc = await Topic.create({ title, description })
    revalidatePath('/')
    return { success: true, topic: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 생성에 실패했습니다 ${error}`)
  }
}

// 2. Edit topic
export async function updateTopic(
  id: string,
  title: string,
  description: string
) {
  try {
    await connectMongoDB()
    const doc = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    revalidatePath('/')
    return { success: true, topic: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 수정에 실패했습니다 ${error}`)
  }
}

// 3. GET by ID
export async function getTopic(id: string) {
  try {
    await connectMongoDB()
    const doc = await Topic.findById(id)
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    return { success: true, topic: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 조회에 실패했습니다 ${error}`)
  }
}

// 4. GET all topics
export async function getAllTopics() {
  try {
    await connectMongoDB()
    const docs = await Topic.find({}).sort({ createdAt: -1 })
    const topics = docs.map((doc) => convertDocToObj(doc))
    return { success: true, topics }
  } catch (error) {
    throw new Error(`모든 토픽 조회에 실패했습니다 ${error}`)
  }
}

// 5. DELETE
export async function deleteTopic(id: string) {
  try {
    await connectMongoDB()
    const doc = await Topic.findByIdAndDelete(id)
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    throw new Error(`토픽 삭제에 실패했습니다 ${error}`)
  }
}
