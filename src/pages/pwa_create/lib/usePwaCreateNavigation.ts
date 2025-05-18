import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_ORDER } from "src/entities/pwa_create/lib/const";

export const usePwaCreateNavigation = (isEdit: boolean = false) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  const basePath = pathSegments.slice(0, -1).join("/");

  const handleNavigateNext = () => {
    const currentIndex = ROUTE_ORDER.indexOf(currentRoute);
    if (currentIndex < ROUTE_ORDER.length - 1) {
      const nextRoute = ROUTE_ORDER[currentIndex + 1];
      console.log(`${basePath}/${nextRoute}`);

      navigate(`${basePath}/${nextRoute}`);
    }
  };

  const handleNavigatePrev = () => {
    const currentIndex = ROUTE_ORDER.indexOf(currentRoute);
    if (currentIndex > 0) {
      const prevRoute = ROUTE_ORDER[currentIndex - 1];
      navigate(`${basePath}/${prevRoute}`);
    }
  };

  const showBackButton = ROUTE_ORDER.indexOf(currentRoute) > 0;

  const showNextButton =
    ROUTE_ORDER.indexOf(currentRoute) < ROUTE_ORDER.length - 1 &&
    ROUTE_ORDER.indexOf(currentRoute) !== -1;

  const showSaveButton = isEdit && ROUTE_ORDER.includes(currentRoute);

  const showPreview =
    currentRoute === "description" ||
    currentRoute === "comments" ||
    currentRoute === "comments_create";

  const finishCreateButton = !isEdit && currentRoute === "metrics";

  const goToTable = () => navigate("/pwa");

  return {
    handleNavigateNext,
    handleNavigatePrev,
    showBackButton,
    showNextButton,
    showSaveButton,
    showPreview,
    finishCreateButton,
    currentRoute,
    goToTable,
    useLocation,
  };
};
