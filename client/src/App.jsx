import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
