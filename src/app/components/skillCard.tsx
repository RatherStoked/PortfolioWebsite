import React from 'react'

const SkillComponent = () => {
  return (
    <div className="border-b cursor-point pt-1 hover:pb-3 hover:font-bold">
    <h2 className="text-sm">Lorem ipsum dolor sit amet</h2>
  </div>
  );
}


const skillCard = () => {
  return (
    <div className="px-5">
      <h1>
        <div className="mt-10 font-bold text-black text-xl min-w-fit">Skills</div>
      </h1>
      <div>
        <div className="pt-8">
          <SkillComponent />
          <SkillComponent />
          <SkillComponent />
          <SkillComponent />
        </div>
      </div>
    </div>
  )
}

export default skillCard;