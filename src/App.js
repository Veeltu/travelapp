import MainView from "./components/Views/MainView";
import ImagesView from "./components/Body/imgPage/ImagesView";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element ={<MainView />} />
    <Route path="/ImagesView" element={<ImagesView />}/>
    </Routes>
    </>
  );
}

export default App;
