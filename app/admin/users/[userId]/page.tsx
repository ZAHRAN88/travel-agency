export default async function Page({
    params,
  }: {
    params: Promise<{ userId: string }>
  }) {
    const userId = (await params).userId
    return <div>userid:  {userId}</div>
  }