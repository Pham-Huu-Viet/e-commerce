import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Styles from "./Login.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const auth = getAuth();

    try {
      // Đăng nhập với email và mật khẩu
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Nếu đăng nhập thành công, điều hướng đến trang chính (home)
      console.log("User logged in:", user);
      navigate("/");
    } catch (error) {
      // Nếu có lỗi (ví dụ mật khẩu sai, email không tồn tại)
      console.error("Error during login:", error.message);
      setError("Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.formCard}>
        <h1 className={Styles.title}>Đăng nhập</h1>
        <p className={Styles.subtitle}>Đăng nhập để tiếp tục mua sắm</p>

        {error && <p className={Styles.errorText}>{error}</p>}

        <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.inputGroup}>
            <label htmlFor="email" className={Styles.label}>
              Email
            </label>
            <div className={Styles.inputWrapper}>
              <User className={Styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                className={Styles.input}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="password" className={Styles.label}>
              Mật khẩu
            </label>
            <div className={Styles.inputWrapper}>
              <Lock className={Styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu của bạn"
                className={Styles.input}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={Styles.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className={Styles.passwordIcon} />
                ) : (
                  <Eye className={Styles.passwordIcon} />
                )}
              </button>
            </div>
          </div>

          <div className={Styles.forgotPassword}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>

          <button type="submit" className={Styles.submitButton}>
            Đăng nhập
          </button>
        </form>

        <div className={Styles.divider}>
          <span>Hoặc</span>
        </div>

        <div className={Styles.socialLogin}>
          <button className={Styles.socialButton}>
            <img
              src="/images/google.png"
              alt="Google"
              className={Styles.socialIcon}
            />
            Đăng nhập với Google
          </button>
          <button className={Styles.socialButton}>
            <img
              src="/images/facebook.png"
              alt="Facebook"
              className={Styles.socialIcon}
            />
            Đăng nhập với Facebook
          </button>
        </div>

        <div className={Styles.register}>
          <p>
            Chưa có tài khoản?{" "}
            <Link to="/register" className={Styles.registerLink}>
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// // import Link from "next/link";
// import { Link } from "react-router-dom";
// // import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";

// import { User, Lock, Eye, EyeOff } from "lucide-react";
// import Styles from "./Login.module.css";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   // const router = useRouter();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Mock login logic
//     console.log("Login with:", formData);
//     // Redirect to home page after login
//     // router.push("/");
//     navigate("/");
//   };

//   return (
//     <div className={Styles.container}>
//       <div className={Styles.formCard}>
//         <h1 className={Styles.title}>Đăng nhập</h1>
//         <p className={Styles.subtitle}>Đăng nhập để tiếp tục mua sắm</p>

//         <form className={Styles.form} onSubmit={handleSubmit}>
//           <div className={Styles.inputGroup}>
//             <label htmlFor="email" className={Styles.label}>
//               Email
//             </label>
//             <div className={Styles.inputWrapper}>
//               <User className={Styles.inputIcon} />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Nhập email của bạn"
//                 className={Styles.input}
//                 required
//                 autoComplete="email"
//               />
//             </div>
//           </div>

//           <div className={Styles.inputGroup}>
//             <label htmlFor="password" className={Styles.label}>
//               Mật khẩu
//             </label>
//             <div className={Styles.inputWrapper}>
//               <Lock className={Styles.inputIcon} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Nhập mật khẩu của bạn"
//                 className={Styles.input}
//                 required
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className={Styles.passwordToggle}
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? (
//                   <EyeOff className={Styles.passwordIcon} />
//                 ) : (
//                   <Eye className={Styles.passwordIcon} />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className={Styles.forgotPassword}>
//             <Link to="/forgot-password">Quên mật khẩu?</Link>
//           </div>

//           <button type="submit" className={Styles.submitButton}>
//             Đăng nhập
//           </button>
//         </form>

//         <div className={Styles.divider}>
//           <span>Hoặc</span>
//         </div>

//         <div className={Styles.socialLogin}>
//           <button className={Styles.socialButton}>
//             <img
//               src="/images/google.png"
//               alt="Google"
//               className={Styles.socialIcon}
//             />
//             Đăng nhập với Google
//           </button>
//           <button className={Styles.socialButton}>
//             <img
//               src="/images/facebook.png"
//               alt="Facebook"
//               className={Styles.socialIcon}
//             />
//             Đăng nhập với Facebook
//           </button>
//         </div>

//         <div className={Styles.register}>
//           <p>
//             Chưa có tài khoản?{" "}
//             <Link to="/register" className={Styles.registerLink}>
//               Đăng ký ngay
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
