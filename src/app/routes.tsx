import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useMatch,
} from "react-router-dom";
import { MainPage } from "src/pages/pwa";
import { PwaCreate } from "src/pages/pwa_create";
import { Sidebar } from "src/widgets/sidebar";

const LayoutWithSidebar = () => {
  const matchCreate = useMatch("/pwa_create/:appId/*");
  const matchEdit = useMatch("/pwa_edit/:appId/*");

  const appId = matchCreate?.params.appId || matchEdit?.params.appId;

  const isEdit = matchEdit?.pathname.startsWith("/pwa_edit");

  return (
    <div className="flex">
      <Sidebar appId={appId} />
      <Routes>
        <Route path="/" element={<Navigate to="/pwa" replace />} />
        <Route path="/pwa" element={<MainPage />} />
        <Route
          path="/pwa_create/:appId/*"
          element={<PwaCreate appId={appId} />}
        />
        <Route
          path="/pwa_edit/:appId/*"
          element={<PwaCreate appId={appId} isEdit={isEdit} />}
        />
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
