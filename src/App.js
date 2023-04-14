import MainView from "./components/Views/MainView";
import Images from "./components/Body/imgPage/Images";
import { Route, Routes } from "react-router-dom";



function App() {
  return (
    <>
    <Routes>
    <Route path="/" element ={<MainView />} />
    <Route path="/images" element={<Images />}/>
    </Routes>
    </>
  );
}

export default App;
