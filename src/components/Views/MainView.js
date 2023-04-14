import BodyView from "../Body/BodyView";
import UpperTab from "../UpperTab";

function MainView() {
  return (
    <div className="flex flex-col justify-center items-center">
        <UpperTab />
        <BodyView />
    </div>
  );
}

export default MainView;
