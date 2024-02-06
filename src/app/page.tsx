import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative bg-gray-500 flex min-h-screen flex-col items-center justify-between">
      <div className="bg-white w-screen h-screen">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-md sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec libero dui.
              <br />Comece o seu teste clicando em Iniciar.</h2>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link href={{
                  pathname: "/session/new",
                }} className="rounded-md bg-indigo-600 font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-3.5 py-2.5 text-sm">Iniciar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
