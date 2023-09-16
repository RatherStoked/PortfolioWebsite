import Link from "next/link";
import React from "react";

const Navbar = () => {

  return (
    <div className="pl-3 min-w-min">
      <div className="text-xs flex pr-32 pt-8">
        <div className="pr-5 pl-3 hover:blur-xs cursor-pointer">
          <Link href="/">mattstokes.xyz</Link>
        </div>
        <div className="invisible md:visible grid grid-cols-3 divide-x text-center">
        {/* <div className="px-5 cursor-pointer">Menu</div>
        <div className="px-5 cursor-pointer">Projects</div> */}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
