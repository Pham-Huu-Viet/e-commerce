import "./styles/globals.css";
import "@fontsource/inter";

import "./App.css";
import AppRouter from "./router";
import StoreProvider from "./store/index";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

function App() {
  useEffect(() => {
    const auth = getAuth();

    // Lắng nghe sự thay đổi trạng thái đăng nhập
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Đã đăng nhập với email:", user.email);

        user.getIdToken().then((token) => {
          console.log("Token hiện tại:", token);

          // Gửi token lên backend nếu cần hoặc lưu lại
          // localStorage.setItem("token", token);
        });
      } else {
        console.log("Chưa đăng nhập");
        // localStorage.removeItem("token"); // nếu muốn clear token
      }
    });

    // Dọn dẹp listener khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
