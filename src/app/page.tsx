import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((item) => (
        <div key={item.id} className="space-y-4">
          <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(item.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>

          {/* NOTE: Whenever loads assets from another domain, you must to the domain config in next.config.js, Like 192.168.1.3 */}
          <Image
            className="aspect-cover w-full rounded-lg"
            src={item.coverUrl}
            width={592}
            height={280}
            alt=""
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {item.excerpt}
          </p>
          <Link
            href={`/memories/${item.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
