import { MainLayout } from "./pages/dashboard";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<MainLayout />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
