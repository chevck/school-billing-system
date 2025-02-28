import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthScreen } from "./pages/auth";
import { CreateBill } from "./pages/create-bill";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthScreen />} />
        <Route path='/create' element={<CreateBill />} />
      </Routes>
    </BrowserRouter>
  );
}
