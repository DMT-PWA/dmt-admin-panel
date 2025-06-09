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
import { setAppId } from "src/entities/pwa_create";
import { useAppDispatch } from "src/shared/lib/store";
import { useEffect } from "react";
const LayoutWithSidebar = () => {
  const matchCreate = useMatch("/pwa_create/:appId/*");
  const matchEdit = useMatch("/pwa_edit/:appId/*");

  const dispatch = useAppDispatch();
  const appId = matchCreate?.params.appId || matchEdit?.params.appId;

  const isEdit = matchEdit?.pathname.startsWith("/pwa_edit");

  useEffect(() => {
    if (!appId) return;
    dispatch(setAppId(appId));
  }, [dispatch, appId]);
  return (
    <div className="flex">
      <Sidebar appId={appId} />
      <Routes>
        <Route path="/" element={<Navigate to="/pwa" replace />} />
        <Route path="/pwa" element={<MainPage />} />
        <Route
          path="/pwa_create/*"
          element={appId && <PwaCreate appId={appId} isEdit={false} />}
        />
        <Route
          path="/pwa_edit/:appId/*"
          element={appId && <PwaCreate appId={appId} isEdit={true} />}
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
