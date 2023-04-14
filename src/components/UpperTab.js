import { useEffect } from "react";
import { themeChange } from "theme-change";

function UpperTab() {

  useEffect(() => {
    themeChange(false)
  },[])

  return (
    <div className="navbar mb-10 drop-shadow-xl bg-base-300 " >
      <div className="justify-between w-full px-4 py-6 mx-auto max-w-7xl">
        <h1 className="text-xl font-bold md:text-xl dark:text-White ">
          travelApp
        </h1>
        <div>
          <select data-choose-theme className="w-full max-w-xs select">
            <option value="">Default</option>
            <option value="dark">dark</option>
            <option value="garden">light garden</option>
            <option value="autumn">light autumn</option>
            <option value="forest">dark forest</option>
            <option value="coffee">dark coffee</option>
            <option value="cyberpunk">cyberpunk</option>
            <option value="aqua">aqua</option>
          

          </select>
        </div>
      </div>
    </div>
  );
}

export default UpperTab;
