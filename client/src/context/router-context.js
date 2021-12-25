import React from "react";
import { useLocation } from "react-router-dom";

export const routerContext = React.createContext(null);

export const RouterProvider = ({ children }) => {
  const location = useLocation();
  const [route, setRoute] = React.useState({
    to: location.pathname,
    from: location.pathname,
  });

  React.useEffect(() => {
    setRoute((prev) => ({ to: location.pathname, from: prev.to }));
  }, [location]);

  return (
    <routerContext.Provider value={route}>{children}</routerContext.Provider>
  );
};
