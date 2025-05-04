// // components/Step3Form.js
// import { useState } from 'react';

// export default function Step3Form({ prevStep, formData, setFormData, handleSubmitData }) {
//   const [ttlAyah, setTtlAyah] = useState({ tempat: '', tanggal: '' });
//   const [ttlIbu, setTtlIbu] = useState({ tempat: '', tanggal: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTtlAyahChange = (e) => {
//     const { name, value } = e.target;
//     const updated = { ...ttlAyah, [name]: value };
//     setTtlAyah(updated);
//     setFormData(prev => ({ ...prev, ttlAyah: `${updated.tempat}, ${updated.tanggal}` }));
//   };

//   const handleTtlIbuChange = (e) => {
//     const { name, value } = e.target;
//     const updated = { ...ttlIbu, [name]: value };
//     setTtlIbu(updated);
//     setFormData(prev => ({ ...prev, ttlIbu: `${updated.tempat}, ${updated.tanggal}` }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Panggil handleSubmitData alih-alih nextStep
//     handleSubmitData();
//   };

//   // Styles defined as plain JavaScript objects
//   const inputStyle = {
//     padding: '0.75rem',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//   };

//   const buttonStyle = {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '0.75rem',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//   };

//   const backButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: '#aaa',
//   };

//   const sectionTitle = {
//     marginTop: '1rem',
//     fontSize: '18px',
//     fontWeight: 'bold',
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//       <h2 style={sectionTitle}>Data Orang Tua</h2>

//       <input
//         name="namaAyah"
//         placeholder="Nama Ayah"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="tempat"
//         placeholder="Tempat Lahir Ayah"
//         value={ttlAyah.tempat}
//         onChange={handleTtlAyahChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         type="date"
//         name="tanggal"
//         value={ttlAyah.tanggal}
//         onChange={handleTtlAyahChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="pekerjaanAyah"
//         placeholder="Pekerjaan Ayah"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="pendapatanAyah"
//         placeholder="Pendapatan Ayah"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="namaIbu"
//         placeholder="Nama Ibu"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="tempat"
//         placeholder="Tempat Lahir Ibu"
//         value={ttlIbu.tempat}
//         onChange={handleTtlIbuChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         type="date"
//         name="tanggal"
//         value={ttlIbu.tanggal}
//         onChange={handleTtlIbuChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="pekerjaanIbu"
//         placeholder="Pekerjaan Ibu"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="pendapatanIbu"
//         placeholder="Pendapatan Ibu"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <input
//         name="noRumah"
//         placeholder="Nomor Rumah"
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />

//       <div style={{ display: 'flex', gap: '1rem' }}>
//         <button type="button" onClick={prevStep} style={backButtonStyle}>Kembali</button>
//         <button type="submit" style={buttonStyle}>Lanjut</button>
//       </div>
//     </form>
//   );
// }