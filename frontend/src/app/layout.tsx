import './globals.css'
import type { Metadata } from 'next'
import { Cabin } from 'next/font/google'
import ParentWrapper from './ParentWrapper'

const font = Cabin({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WakiKani Sheet Generator',
  description: 'Review your WaniKani kanji and vocabulary with a spreadsheet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div id="root" className='bg-slate-200 flex h-screen flex-col'>
          <ParentWrapper>
            {children}
          </ParentWrapper>
        </div>
      </body>
    </html>
  )
}
