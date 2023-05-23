import { Blur } from '@/components/Blur'
import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Stripes } from '@/components/Stripes'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] px-28 py-16">
        <Blur />
        <Stripes />
        <SignIn />
        <Hero />
        <Copyright />
      </div>
      <div className="p16 flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  )
}
