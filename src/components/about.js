export default function About() {
    return (
      <section
        style={{
          padding: "70px 20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
          backgroundImage: "linear-gradient(to right, #f8f9fa, #e8f5e9)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "#2e7d32",
              height: "4px",
              width: "100px",
              margin: "0 auto 10px",
              borderRadius: "2px",
            }}
          ></div>
  
          <h2
            style={{
              fontSize: "2.75rem",
              fontWeight: "800",
              marginBottom: "35px",
              textAlign: "center",
              color: "#2e7d32",
              letterSpacing: "1px",
            }}
          >
            🌿 Sekilas Mengenai Kami 🌿
          </h2>
  
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "35px 45px",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
              fontSize: "1.1rem",
              lineHeight: "1.9",
              color: "#333",
              transition: "all 0.3s ease",
            }}
          >
            <p style={{ marginBottom: "25px", textAlign: "justify" }}>
              MI Kebonsari didirikan pada tahun{" "}
              <span style={{ fontWeight: "600", color: "#2e7d32" }}>1994</span>{" "}
              oleh para tokoh masyarakat Kebonsari yang memiliki komitmen kuat
              terhadap pentingnya pendidikan bagi generasi penerus. Keberadaan
              madrasah ini bertujuan untuk menyediakan fasilitas pendidikan yang
              berkualitas serta mencetak siswa-siswi yang unggul dalam berbagai
              aspek, baik akademik maupun non-akademik.
            </p>
  
            <p style={{ textAlign: "justify" }}>
              Saat ini, MI Kebonsari beroperasi dalam satu kompleks dengan Pondok
              Pesantren{" "}
              <span style={{ fontWeight: "600", color: "#2e7d32" }}>
                "ATTAUBAH"
              </span>
              , sebuah lembaga pendidikan Islam yang berperan dalam pembentukan
              karakter dan akhlak peserta didik. Pondok pesantren ini diasuh oleh{" "}
              <span style={{ fontWeight: "600" }}>KH. Nuriyadin, M.Fil.I</span>,
              yang juga menjabat sebagai Ketua Pengurus Maarif Nailul Huda
              Kebonsari. Dengan adanya sinergi antara MI Kebonsari dan Pondok
              Pesantren "ATTAUBAH", diharapkan lulusan madrasah ini tidak hanya
              memiliki kecerdasan intelektual, tetapi juga kedalaman spiritual
              serta karakter yang kuat untuk menghadapi tantangan masa depan.
            </p>
          </div>
        </div>
      </section>
    );
  }
  