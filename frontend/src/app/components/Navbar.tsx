"use client"

import { useWakinakiDataContext } from '../context/WakinakiData'
import Link from 'next/link'

const Navbar = (): JSX.Element => {
  const { loading, fetchData } = useWakinakiDataContext();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>

          {!loading && <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] shadow bg-base-100 rounded-box w-52">
            <li><a>Kanji</a></li>
            <li><a>Vocabulary</a></li>
          </ul>}
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href="/">WK Sheet Generator</Link>
      </div>
      {!loading && <>
        <div className="navbar-center hidden lg:flex max-h-0">
          <ul className="menu menu-horizontal ">
            <li><Link href="/kanji">Kanji</Link></li>
            <li><a className='btn-disabled'>Vocabulary</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={fetchData}>Refresh</a>
        </div>
      </>}
    </div>
  )
}

export default Navbar
