import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Components/Applayout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetails from "./feature/Products/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import FrontPage from "./pages/FrontPage";
import FrontPageLayout from "./Components/FrontPageLayout";
import BestSeller from "./pages/BestSeller";
import UserOrders from "./pages/userOrders";
import ForgotPass from "./pages/ForgotPassword";
// import ResetPassForm from "./feature/Form/ResetPasswordForm";
import ResetPassPage from "./pages/ResetPasswordPage";
import Orders from "./pages/Orders";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 0 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<FrontPageLayout></FrontPageLayout>}>
            {/* <Route path="/form" element={<FrontPage></FrontPage>} /> */}
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<Signup></Signup>} />
            <Route path="/forgotPass" element={<ForgotPass></ForgotPass>} />
            <Route path="/resetpassword/:token" element={<ResetPassPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:type" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/BestSeller" element={<BestSeller />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/verify" element={<UserOrders></UserOrders>} />
            <Route path="/order/:id" element={<Orders />} />
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
