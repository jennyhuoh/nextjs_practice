import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router= useRouter()
  useEffect(() => {
    router.push(`/users/${123}/repos`)
  }, [])
  return (
    <>
      <Head>
        <title>Github Rest Api</title>
      </Head>
    </>
  )
}
