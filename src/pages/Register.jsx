import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { auth, db } from "../firebase/firebase"; // Import Firebase auth và db
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Để lưu dữ liệu vào Firestore
import Styles from "./Register.module.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Đăng ký tài khoản với email và mật khẩu
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        // Lưu tên và số điện thoại vào Firestore
        await setDoc(doc(db, "users", user.uid), {
          fullName: formData.fullName,
          phone: formData.phone,
        });

        console.log("User created and saved to Firestore:", user);

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Error signing up:", error.message);
        setErrors({
          ...errors,
          general: "Đã có lỗi xảy ra khi đăng ký tài khoản. Vui lòng thử lại!",
        });
      }
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.formCard}>
        <h1 className={Styles.title}>Đăng ký tài khoản</h1>
        <p className={Styles.subtitle}>Tạo tài khoản để mua sắm dễ dàng hơn</p>

        <form className={Styles.form} onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className={Styles.inputGroup}>
            <label htmlFor="fullName" className={Styles.label}>
              Họ và tên
            </label>
            <div className={Styles.inputWrapper}>
              <User className={Styles.inputIcon} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                className={Styles.input}
                required
                autoComplete="name"
              />
            </div>
            {errors.fullName && (
              <p className={Styles.errorText}>{errors.fullName}</p>
            )}
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="email" className={Styles.label}>
              Email
            </label>
            <div className={Styles.inputWrapper}>
              <Mail className={Styles.inputIcon} />
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
            {errors.email && <p className={Styles.errorText}>{errors.email}</p>}
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="phone" className={Styles.label}>
              Số điện thoại
            </label>
            <div className={Styles.inputWrapper}>
              <Phone className={Styles.inputIcon} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại của bạn"
                className={Styles.input}
                autoComplete="tel"
              />
            </div>
            {errors.phone && <p className={Styles.errorText}>{errors.phone}</p>}
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
                autoComplete="new-password"
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
            {errors.password && (
              <p className={Styles.errorText}>{errors.password}</p>
            )}
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="confirmPassword" className={Styles.label}>
              Xác nhận mật khẩu
            </label>
            <div className={Styles.inputWrapper}>
              <Lock className={Styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu của bạn"
                className={Styles.input}
                required
              />
              <button
                type="button"
                className={Styles.passwordToggle}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeOff className={Styles.passwordIcon} />
                ) : (
                  <Eye className={Styles.passwordIcon} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={Styles.errorText}>{errors.confirmPassword}</p>
            )}
          </div>

          {errors.general && (
            <p className={Styles.errorText}>{errors.general}</p>
          )}

          <button type="submit" className={Styles.submitButton}>
            Đăng ký
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
            Đăng ký với Google
          </button>
          <button className={Styles.socialButton}>
            <img
              src="/images/facebook.png"
              alt="Facebook"
              className={Styles.socialIcon}
            />
            Đăng ký với Facebook
          </button>
        </div>

        <div className={Styles.login}>
          <p>
            Đã có tài khoản?{" "}
            <Link to="/login" className={Styles.loginLink}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
