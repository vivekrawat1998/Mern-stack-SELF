import React from "react";

const Navbar = () => {
  return (
    <div className="text-white flex justify-between px-20 border-2 items-center">
      <div>
        <h1>Ecommerce</h1>
      </div>
      <div  className="flex gap-10 mt-2">
        {["home", "about", "blogs", "cart"].map((e, index) => {
          return (
            <div key={index} className="list-none">
              <li>{e}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
