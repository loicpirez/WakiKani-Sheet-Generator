import './globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { WakinakiDataProvider } from './context/WakinakiData'
import Navbar from './components/Navbar'

const font = Ubuntu({
  weight: ["300", "400", "500"],
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: 'WK Sheet Generator',
  description: 'Generate sheets from your WaniKani data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} `}>
        <WakinakiDataProvider>
          <div id="app" className="h-screen flex flex-col selection:bg-sky-950/50 selection:text-white">
            <div id="header" className='sticky top-0 z-50'>
              <Navbar />
            </div>
            <div id="main" className="relative">
              {children}
            </div>
            {/* <footer className="footer footer-center p-4 text-base-content">
              <aside>
                <p className="flex items-center">
                  Made with
                  <svg className="w-6 h-6  ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                  </svg>
                </p>
              </aside>
            </footer> */}
          </div>
        </WakinakiDataProvider>
      </body>
    </html>
  )
}
