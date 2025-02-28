import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthScreen } from "./pages/auth";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
