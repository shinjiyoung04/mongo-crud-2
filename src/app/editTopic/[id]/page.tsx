import EditTopicForm from '@/components/EditTopicForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const apiUrl = process.env.API_URL

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch topic.')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function EditTopic({
  params,
}: {
  params: { id: string }
}) {
  // 서버에서 세션을 확인
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  // ID에 해당하는 주제를 서버에서 가져옴
  const { id } = params
  const { topic } = await getTopicById(id)
  if (!topic) {
    return <div>Topic not found</div> // 주제를 찾을 수 없을 경우
  }
  const { title, description } = topic

  return <EditTopicForm id={id} title={title} description={description} />
}
