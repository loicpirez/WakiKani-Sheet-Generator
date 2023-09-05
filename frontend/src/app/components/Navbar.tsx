"use client"

import { useWakinakiDataContext } from '../context/WakinakiData'
import Link from 'next/link'

const Navbar = (): JSX.Element => {
  const { loading, fetchData } = useWakinakiDataContext();

  return (
    <div className="navbar shadow-sm sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors lg:z-50 lg:border-b lg:border-slate-900/10  supports-backdrop-blur:bg-white/95 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>

          {!loading && <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] shadow bg-base-100 rounded-box w-52">
            <li><Link href="/kanji">Kanji</Link></li>
            <li><Link href="/vocabulary">Vocabulary</Link></li>
            <li><Link href="/radical">Radicals</Link></li>
          </ul>}
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href="/">WK Sheet Generator</Link>
      </div>
      {!loading && <>
        <div className="navbar-center hidden lg:flex max-h-0">
          <ul className="menu menu-horizontal">
            <li><Link href="/kanji">Kanji</Link></li>
            <li><Link href="/vocabulary">Vocabulary</Link></li>
            <li><Link href="/radical">Radicals</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn opacity-80" onClick={fetchData}>Refresh</a>
        </div>
      </>}
    </div>
  )
}

export default Navbar
