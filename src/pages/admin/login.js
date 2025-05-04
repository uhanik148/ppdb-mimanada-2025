import { useState } from "react";
import { useRouter } from "next/router";
import { FaUserShield, FaLock, FaSignInAlt } from "react-icons/fa";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #f0fdf4, #eef7ef)", // hijau semu banget
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <FaUserShield size={60} color="#56ab2f" />
        </div>
        <h2
          style={{
            marginBottom: 30,
            color: "#2e7d32",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          Login Admin
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 15,
            border: "1px solid #ccc",
            borderRadius: 8,
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
            borderRadius: 8,
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
            backgroundColor: "#56ab2f",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 17,
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaSignInAlt style={{ marginRight: 10 }} />
          Masuk
        </button>
      </div>
    </div>
  );
}
