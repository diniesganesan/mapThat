import { navigator } from "@/utils";
import { Navigate, Route, Routes } from "react-router-dom";
export const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      {navigator.map((nav, index) => (
        <Route key={index} path={nav.url} element={nav.element} />
      ))}
    </Routes>
  );
};