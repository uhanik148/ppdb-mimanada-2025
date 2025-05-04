import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FormStepper from '@/components/FormStepper'

export default function PendaftaranPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      {/* ⬇️ Tambahkan button logout di sini */}
      <button 
        onClick={() => {
          localStorage.removeItem('isLoggedIn') // hapus login
          router.push('/auth/login') // balik ke login
        }}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

      {/* Judul halaman */}
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Formulir Pendaftaran</h1>

      {/* Form Stepper */}
      <FormStepper />
    </div>
  )
}
