import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MainPage } from "@/pages/MainPage/ui/main-page";

export function App() {
  return (
    <div>
      <MainPage />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
