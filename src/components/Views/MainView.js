import CountriesGrid from "../features/CountriesGrid";
import UpperTab from "../features/UpperTab";

function MainView() {
  return (
    <div className="px-10 flex flex-col justify-center items-center">
        <UpperTab />
        <CountriesGrid />
    </div>
  );
}

export default MainView;
