import { getPostListData, getPostPageData } from '@/api'

export default async function Home() {
  const list = await getPostListData()

  const page = await getPostPageData()

  return (
    <main>
      <div>
        { list.map((item) => (
            <div key={item.id}>
              {item.title}
            </div>
          ))
        }
      </div>
    </main>
  )
}
