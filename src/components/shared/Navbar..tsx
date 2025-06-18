import React from "react"

const Navbar = (): JSX.Element => {
  return (
    <nav className="sticky top-0 z-10 flex pt-10 px-5 pb-5 justify-between flex-wrap items-center bg-black lg:justify-between">
      <ul className="font-kanit list-none flex items-center p-0 m-0 gap-SPACE_07 text-white font-normal text-title-small cursor-pointer">
        <li>Docs</li>
        <li>Releases</li>
        <li>Plans</li>
        <li>Blog</li>
        <li>Testimonials</li>
        <li>Contact</li>
      </ul>
      <div className="flex gap-3">
        <button className="font-kanit bg-transparent border-0 text-[#30EDE6] font-normal text-title-tiny cursor-pointer">
          Signup
        </button>
        <button className="font-kanit bg-transparent border-0 text-[#30EDE6] font-normal text-title-tiny cursor-pointer">
          Book a Demo
        </button>
      </div>
    </nav>
  )
}

export default Navbar
