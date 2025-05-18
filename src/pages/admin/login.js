import { useState } from "react";
import { useRouter } from "next/router";
import { FaUserShield, FaLock, FaSignInAlt } from "react-icons/fa";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showIndex, setShowIndex] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("admin-token", data.token);
      router.push("/admin");
    } else {
      alert(data.message);
    }
  };

    const faqs = [
    {
      question: "Apa saja yang bisa dilakukan admin di halaman ini?",
      answer:
        "Admin memiliki akses penuh untuk mengelola konten halaman Beranda, Profil Kami, dan Info Pendaftaran. Selain itu, admin juga bisa melihat detail pendaftar dan menghapus data pendaftaran jika diperlukan.",
    },
    {
      question: "Apakah halaman ini bisa diakses oleh semua orang?",
      answer:
        "Tidak. Hanya admin yang memiliki username dan password yang benar yang bisa masuk ke halaman ini.",
    },
    {
      question: "Bagaimana jika lupa password admin?",
      answer:
        "Silakan hubungi pengelola sistem untuk reset password. Fitur reset otomatis belum tersedia di sistem ini.",
    },
  ];


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #e8f5e9, #f1f8e9)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <FaUserShield size={60} color="#43a047" />
        </div>
        <h2 style={{ marginBottom: 25, color: "#2e7d32", fontSize: "26px", fontWeight: "bold" }}>
          Login Admin
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 15,
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <FaUserShield style={{ marginRight: 10, color: "#888" }} />
          <input
            type="text"
            placeholder="Nama Admin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: 16,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 25,
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <FaLock style={{ marginRight: 10, color: "#888" }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: 16,
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 17,
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <FaSignInAlt style={{ marginRight: 10 }} />
          Masuk
        </button>

        {/* FAQ Interaktif */}
        <div
          style={{
            textAlign: "left",
            backgroundColor: "#f1f8e9",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #c8e6c9",
          }}
        >
          <h3 style={{ color: "#2e7d32", marginBottom: 10, fontWeight: "bold" }}>📌 FAQ Admin</h3>
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                onClick={() =>
                  setShowIndex(showIndex === index ? null : index)
                }
                style={{
                  cursor: "pointer",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                  fontWeight: "bold",
                  color: "#33691e",
                }}
              >
                {faq.question}
              </div>
              {showIndex === index && (
                <div style={{ padding: "8px 0 16px", color: "#444" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
