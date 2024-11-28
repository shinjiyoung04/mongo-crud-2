import TopicsList from '@/components/TopicsList'
import './globals.css'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">WebDev Topics</h1>
      <p className="mb-4">MongoDB CRUB Exampe</p>
      <TopicsList />
      <TopicsList />
      <TopicsList />
    </div>
  )
}
