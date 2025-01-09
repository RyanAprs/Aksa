import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { DarkModeProvider } from "./context/DarkMode";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Router>
        <DarkModeProvider>
          <ScrollToTop>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <Profile />
                  </>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop>
        </DarkModeProvider>
      </Router>
    </div>
  );
};

export default App;
