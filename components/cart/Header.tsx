import React from "react";

function Header({ name }: { name: string }) {
  return (
    <div>
      <h1 className="sm:text-2xl text-lg ">
        {name.length ? `${name}'s` : ""} Cart
      </h1>
    </div>
  );
}

export default Header;
