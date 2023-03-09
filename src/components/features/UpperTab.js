import DarkMode from "./DarkMode";

function UpperTab() {
  return (
    <div className="bg-White/40 dark:bg-DarkBlue/40 drop-shadow-md backdrop-filter backdrop-blur-sm">
      <div className="flex items-center justify-between w-full px-4 py-6 mx-auto max-w-7xl">
        <h1 className="text-xl font-bold md:text-xl dark:text-White ">
          Where in the World?
        </h1>
        <DarkMode />
      </div>
    </div>
  );
}

export default UpperTab;
