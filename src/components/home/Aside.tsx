import React from "react"

const Aside = (): JSX.Element => {
  return (
    <aside
      className="relative flex flex-col border-r border-r-[#5D5D5D] h-screen"
      style={{borderRight: "1px solid #5D5D5D4d"}}
    >
      <div className="pt-10 px-7">
        <img src="/images/home/logo-light.svg" alt="Logo" width={141} className="cursor-pointer" />
      </div>
      <div className="mt-[600px] bg-[#5D5D5D4D] h-[1px] w-auto"></div>
      <div className="absolute bottom-0 flex w-full">
        <button className="px-9 py-9 bg-[#343335] border-0 border-r border-r-[#3B3B3B] w-full flex items-center justify-center cursor-pointer">
          <img src="/images/home/keyboard.svg" alt="keyboard" />
        </button>
        <button className="px-9 py-9 bg-[#343335] border-0 border-r border-r-[#3B3B3B] w-full flex items-center justify-center cursor-pointer">
          <img src="/images/home/dots-three.svg" alt="keyboard" />
        </button>
      </div>
    </aside>
  )
}

export default Aside
