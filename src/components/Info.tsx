import React from "react";

function Info() {
  return (
    <div className="">
      <h1 className="m-1 text-lg">
        <b>Keyboard shortcuts</b>
      </h1>
      <ul className="">
        <li className="flex flex-row items-center justify-between text-sm py-2 px-1 border-y-[1px]">
          <p>Toggle play/pause</p>
          <p className="w-1/3 text-center font-semibold">p</p>
        </li>
        <li className="flex flex-row items-center justify-between text-sm py-2 px-1 border-b-[1px]">
          <p>Rewind 10 words</p>
          <p className="w-1/3 text-center font-semibold">k</p>
        </li>
        <li className="flex flex-row items-center justify-between text-sm py-2 px-1 border-b-[1px]">
          <p>Fast forward 10 words</p>
          <p className="w-1/3 text-center font-semibold">l</p>
        </li>
        <li className="flex flex-row items-center justify-between text-sm py-2 px-1 border-b-[1px]">
          <p>Decrease playback rate</p>
          <p className="w-1/3 text-center font-bold">,</p>
        </li>
        <li className="flex flex-row items-center justify-between text-sm py-2 px-1 border-b-[1px]">
          <p>Increase playback rate</p>
          <p className="w-1/3 text-center font-bold">.</p>
        </li>
      </ul>
    </div>
  );
}

export default Info;
