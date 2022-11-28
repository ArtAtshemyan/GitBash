import './App.css';
import Forms from "./screen/form/Form";
import HomePage from "./screen/homePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./components/signup/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Forms/>}/>
                <Route path={'homepage/:emails'} element={<HomePage/>}/>
                <Route path={'addMember/:emails'} element={<SignUp/>}/>
             </Routes>
        </BrowserRouter>
    );
}

export default App;
