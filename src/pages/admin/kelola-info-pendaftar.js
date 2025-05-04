// pages/admin/kelola-info-pendaftaran.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function KelolaInfoPendaftar() {
  const router = useRouter();
  const [infoPendaftaran, setInfoPendaftaran] = useState([]);
  const [formData, setFormData] = useState({
    sectionTitle: "",
    description: "",
    brosurUrl: "",
    googleDocUrl: "",
    daftarUrl: "",
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get("/api/admin/kelola-info-pendaftar");
        setInfoPendaftaran(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put("/api/admin/kelola-info-pendaftar", { id: currentId, ...formData });
        alert("Data berhasil diperbarui");
      } else {
        await axios.post("/api/admin/kelola-info-pendaftar", formData);
        alert("Data berhasil ditambahkan");
      }
      // Reset form
      setFormData({
        sectionTitle: "",
        description: "",
        brosurUrl: "",
        googleDocUrl: "",
        daftarUrl: "",
      });
      setEditing(false);
      setCurrentId(null);
      // Refresh data
      const response = await axios.get("/api/admin/kelola-info-pendaftar");
      setInfoPendaftaran(response.data);
    } catch (error) {
      console.error("Gagal menyimpan:", error);
    }
  };

  const handleEdit = (id) => {
    const selected = infoPendaftaran.find((item) => item.id === id);
    setFormData({ ...selected });
    setEditing(true);
    setCurrentId(id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await axios.delete("/api/admin/kelola-info-pendaftar", { data: { id } });
      alert("Data berhasil dihapus");
      setInfoPendaftaran((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Kelola Informasi Pendaftaran</h1>
      <p style={styles.subtext}>
        Masukkan informasi penting terkait pendaftaran siswa baru yang akan ditampilkan ke publik.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Judul Seksi</label>
        <input
          type="text"
          name="sectionTitle"
          value={formData.sectionTitle}
          onChange={handleChange}
          placeholder="Contoh: Langkah Pendaftaran Online"
          required
          style={styles.input}
        />

        <label style={styles.label}>Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Contoh: Silakan ikuti langkah-langkah berikut..."
          required
          style={styles.textarea}
        />

        <label style={styles.label}>URL Brosur (opsional)</label>
        <input
          type="text"
          name="brosurUrl"
          value={formData.brosurUrl}
          onChange={handleChange}
          placeholder="https://example.com/brosur.pdf"
          style={styles.input}
        />

        <label style={styles.label}>Link Google Docs (opsional)</label>
        <input
          type="text"
          name="googleDocUrl"
          value={formData.googleDocUrl}
          onChange={handleChange}
          placeholder="https://docs.google.com/..."
          style={styles.input}
        />

        <label style={styles.label}>Link Formulir Pendaftaran</label>
        <input
          type="text"
          name="daftarUrl"
          value={formData.daftarUrl}
          onChange={handleChange}
          placeholder="https://forms.gle/..."
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {editing ? "Simpan Perubahan" : "Tambah Informasi"}
        </button>
      </form>

      <h2 style={{ marginTop: "3rem" }}>Data yang Sudah Ditambahkan</h2>
      {infoPendaftaran.length === 0 ? (
        <p style={{ fontStyle: "italic" }}>Belum ada informasi pendaftaran yang ditambahkan.</p>
      ) : (
        <ul style={styles.list}>
          {infoPendaftaran.map((item) => (
            <li key={item.id} style={styles.card}>
              <h3>{item.sectionTitle}</h3>
              <p>{item.description}</p>
              {item.brosurUrl && <p><strong>Brosur:</strong> <a href={item.brosurUrl} target="_blank">Lihat</a></p>}
              {item.googleDocUrl && <p><strong>Google Doc:</strong> <a href={item.googleDocUrl} target="_blank">Lihat</a></p>}
              {item.daftarUrl && <p><strong>Form Pendaftaran:</strong> <a href={item.daftarUrl} target="_blank">Daftar</a></p>}
              <div style={styles.cardActions}>
                <button onClick={() => handleEdit(item.id)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => router.push("/admin")} style={styles.backButton}>
        ⬅ Kembali ke Dashboard Admin
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subtext: {
    color: "#555",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  button: {
    padding: "0.7rem",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
  },
  card: {
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  },
  cardActions: {
    marginTop: "1rem",
    display: "flex",
    gap: "1rem",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "2rem",
    padding: "0.7rem 1.2rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
