import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthScreen } from "./pages/auth";
import { CreateBill } from "./pages/create-bill";
import { Layout } from "./components/layout";
import { Bills } from "./pages/bills";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthScreen />} />
        <Route path='/' element={<Layout />}>
          <Route path='/bills' element={<Bills />} />
          <Route path='/dashboard' element={null} />
        </Route>
        <Route path='/create-bill' element={<CreateBill />} />
      </Routes>
    </BrowserRouter>
  );
}
