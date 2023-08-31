const Navbar = (): JSX.Element => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Kanji</a></li>
            <li><a>Vocabulary</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">WK Sheet Generator</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            <li><a>Kanji</a></li>
            <li><a>Vocabulary</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Refresh</a>
      </div>
    </div>

    // <div className="top-0 z-10 backdrop-filter navbar sticky h-16 transition-all backdrop-blur bg-opacity-90 bg-primary text-slate-50 after:absolute after:inset-x-0 after:w-full after:h-12 after:shadow-hr after:z-[-1] shadow-primary shadow">
    //   <div className="flex-1">
    //     <a className="btn btn-ghost normal-case text-xl">WakiNaki Sheet Generator</a>
    //   </div>
    //   <div className="flex-none">
    //     <ul className="menu menu-horizontal px-1 text-base">
    //       <li><a className="hover:text-white">Kanji</a></li>
    //       <li><a className="hover:text-white">Vocabulary</a></li>
    //     </ul>
    //   </div>
    // </div>
  )
}

export default Navbar
