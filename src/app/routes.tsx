import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainPage } from "src/pages/pwa";
import { Sidebar } from "src/widgets/sidebar";

const AppRouter = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Navigate to="/pwa" replace />} />
          <Route path="/pwa" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
