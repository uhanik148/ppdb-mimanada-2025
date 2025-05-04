import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function RegisterPage() {
  const router = useRouter()
  const [nama, setNama] = useState('')
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sesuai!')
      return
    }
    try {
      await axios.post('/api/auth/register', { nama, nisn, password })
      router.push('/auth/login')
    } catch (error) {
      setError('Gagal register! Periksa NISN atau data anda.')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-16 h-16" />
          <h2 className="text-2xl font-semibold text-gray-800">Silahkan Daftar terlebih dahulu</h2>
          <p className="text-sm text-gray-600">Isi data di bawah ini untuk melanjutkan</p>
        </div>

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="NISN"
          value={nisn}
          onChange={(e) => setNisn(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            Tampilkan Password
          </label>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Daftar
        </button>

        <p className="mt-4 text-center">
          Sudah punya akun?{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Masuk
          </a>
        </p>
      </div>
    </div>
  )
}

