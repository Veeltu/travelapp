import DarkMode from "./DarkMode";
import { useEffect } from "react";
import { themeChange } from "theme-change";

function UpperTab() {

  useEffect(() => {
    themeChange(false)
  },[])

  return (
    <div className="mb-10 drop-shadow-2xl bg-White/5">
      <div className="flex items-center justify-between w-full px-4 py-6 mx-auto max-w-7xl">
        <h1 className="text-xl font-bold md:text-xl dark:text-White ">
          Where in the World?
        </h1>
        {/* <DarkMode /> */}
        <div>
          change theme
          <select data-choose-theme className="w-full max-w-xs select">
            <option value="">Default</option>
            <option value="dark">dark</option>
            <option value="light">light</option>
            <option value="cyberpunk">cyberpunk</option>
            <option value="aqua">aqua</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default UpperTab;
