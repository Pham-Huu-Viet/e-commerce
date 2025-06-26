import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBPTV9F97sBM7VdWozsjliazly9Tybzoz4",
  authDomain: "e-commerce-web-52c52.firebaseapp.com",
  projectId: "e-commerce-web-52c52",
  storageBucket: "e-commerce-web-52c52.firebasestorage.app",
  messagingSenderId: "345436399989",
  appId: "1:345436399989:web:498a3ae91b784ecdce0b3c",
  measurementId: "G-M3C6FWW25R",
};

// ✅ Đầu tiên khởi tạo app
const app = initializeApp(firebaseConfig);

// ✅ Rồi mới gọi getAnalytics
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
