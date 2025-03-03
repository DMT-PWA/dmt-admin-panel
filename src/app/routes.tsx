import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainPage } from "src/pages/pwa";
import { PwaDesign, PwaDescription } from "src/pages/pwa_create";
import { Sidebar } from "src/widgets/sidebar";

const LayoutWithSidebar = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/pwa" replace />} />
        <Route path="/pwa" element={<MainPage />} />
        <Route path="/pwa_create" element={<PwaDesign />} />
        <Route path="/pwa_description" element={<PwaDescription />} />
      </Routes>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <LayoutWithSidebar />
    </Router>
  );
};

export default AppRouter;
