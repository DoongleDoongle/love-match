import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePlatformNameData = () => {
  const location = useLocation();
  const [platformName, setPlatformName] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const roomsIndex = pathParts.indexOf("rooms");
    if (roomsIndex > 0) {
      setPlatformName(pathParts[roomsIndex - 1]);
    }
  }, [location.pathname]);

  return { platformName };
};
