import { useEffect, useMemo, useState } from 'react'
import Controls from './components/Controls.jsx'
import Catalog from './components/Catalog.jsx'
import RegistrationList from './components/RegistrationList.jsx'
import Summary from './components/Summary.jsx'
import { MAX_JENIS, MAX_KURSI } from './utils.js'

export default function App() {
  const [workshops, setWorkshops] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [selected, setSelected] = useState([])
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/data/workshop.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Server membalas status ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setWorkshops(data)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setErrorMsg(err.message || 'Terjadi kesalahan jaringan')
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const byId = useMemo(() => {
    const map = {}
    workshops.forEach((w) => (map[w.id] = w))
    return map
  }, [workshops])

  const qtyOf = (id) => selected.find((s) => s.id === id)?.qty ?? 0
  const sisaKuota = (id) => (byId[id] ? byId[id].kuota - qtyOf(id) : 0)

  const totalKursi = selected.reduce((sum, s) => sum + s.qty, 0)
  const jenis = selected.length
  const sisaBatas = MAX_KURSI - totalKursi
  const totalBiaya = selected.reduce((sum, s) => sum + s.qty * (byId[s.id]?.harga ?? 0), 0)

  const fail = (text) => {
    setNotice({ type: 'error', text })
    return { ok: false, message: text }
  }

  const handleAdd = (id) => {
    const w = byId[id]
    if (!w) return
    if (w.kuota === 0) return fail(`${w.nama} sudah penuh dan tidak dapat dipilih.`)
    const current = qtyOf(id)
    if (current === 0 && jenis >= MAX_JENIS)
      return fail(`Maksimal ${MAX_JENIS} jenis workshop dalam satu transaksi.`)
    if (current + 1 > w.kuota)
      return fail(`Kuota ${w.nama} hanya ${w.kuota} kursi.`)
    if (totalKursi + 1 > MAX_KURSI)
      return fail(`Maksimal ${MAX_KURSI} kursi dalam satu transaksi.`)

    setSelected((prev) =>
      current === 0
        ? [...prev, { id, qty: 1 }]
        : prev.map((s) => (s.id === id ? { ...s, qty: s.qty + 1 } : s))
    )
    setNotice({ type: 'ok', text: `${w.nama} ditambahkan.` })
    return { ok: true }
  }

  const handleChangeQty = (id, raw) => {
    const w = byId[id]
    const text = String(raw).trim()
    if (!/^\d+$/.test(text)) return fail('Jumlah harus berupa bilangan bulat positif.')
    const value = Number(text)
    if (value < 1) return fail('Jumlah harus berupa bilangan bulat positif.')
    if (value > w.kuota) return fail(`Kuota ${w.nama} hanya ${w.kuota} kursi.`)
    const lainnya = totalKursi - qtyOf(id)
    if (lainnya + value > MAX_KURSI)
      return fail(`Maksimal ${MAX_KURSI} kursi dalam satu transaksi.`)

    setSelected((prev) => prev.map((s) => (s.id === id ? { ...s, qty: value } : s)))
    setNotice(null)
    return { ok: true }
  }

  const handleRemove = (id) => {
    setSelected((prev) => prev.filter((s) => s.id !== id))
    setNotice({ type: 'ok', text: `${byId[id].nama} dihapus dari daftar.` })
  }

  const filtered = workshops.filter((w) => {
    const cocokNama = w.nama.toLowerCase().includes(query.trim().toLowerCase())
    const cocokKategori = category === 'Semua' || w.kategori === category
    return cocokNama && cocokKategori
  })
  const categories = ['Semua', ...new Set(workshops.map((w) => w.kategori))]

  const rows = selected.map((s) => ({ ...byId[s.id], qty: s.qty }))

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#beranda" aria-label="KampusCraft Portal Workshop">
          <span className="brand-mark" aria-hidden="true">K</span>
          <span className="brand-copy">
            <strong>Kampus<span>Craft</span></strong>
            <small>Portal Workshop</small>
          </span>
        </a>
        <nav className="top-nav" aria-label="Navigasi utama">
          <a className="is-active" href="#katalog">Katalog</a>
          <a href="#pendaftaran">Pendaftaran</a>
          <a href="#ringkasan">Ringkasan</a>
        </nav>
      </header>

      <main className="page-shell" id="beranda">
        <section className="hero">
          <div className="semester-label"><span /> Semester Genap 2025</div>
          <p className="hero-eyebrow">Kuota Terbatas Mahasiswa</p>
          <h1>Pendaftaran <span>Workshop Kampus</span></h1>
          <p className="hero-description">
            Tingkatkan keterampilan teknologi dan portofolio Anda. Pilih maksimal{' '}
            <strong>{MAX_JENIS} jenis workshop</strong> dan total{' '}
            <strong>{MAX_KURSI} kursi</strong> dalam satu transaksi.
          </p>
        </section>

        <div className="layout">
          <section className="main-col" id="katalog" aria-label="Katalog workshop">
            <Controls
              query={query}
              onQueryChange={setQuery}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
              disabled={status !== 'success'}
            />
          {notice && (
            <p
              className={`notice notice-${notice.type}`}
              role={notice.type === 'error' ? 'alert' : 'status'}
            >
              {notice.text}
            </p>
          )}

          {status === 'loading' && (
            <p className="state" role="status">Memuat data workshop…</p>
          )}

          {status === 'error' && (
            <div className="state state-error" role="alert">
              <p>Data gagal dimuat: {errorMsg}.</p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setStatus('loading')
                  setErrorMsg('')
                  setReloadKey((k) => k + 1)
                }}
              >
                Coba Lagi
              </button>
            </div>
          )}

          {status === 'success' && (
            <Catalog
              items={filtered}
              sisaKuota={sisaKuota}
              onAdd={handleAdd}
            />
          )}
          </section>

          <aside className="side-col" aria-label="Pendaftaran Anda">
            <RegistrationList
              rows={rows}
              onChangeQty={handleChangeQty}
              onRemove={handleRemove}
            />
            <Summary
              totalKursi={totalKursi}
              jenis={jenis}
              sisaBatas={sisaBatas}
              totalBiaya={totalBiaya}
            />
          </aside>
        </div>
      </main>

      <footer className="footer">
        <span><strong>KampusCraft Workshop</strong> · Sistem Pendaftaran Akademik Terpadu</span>
        <span className="footer-links">
          <a href="#katalog">Katalog Workshop</a>
          <a href="#pendaftaran">Pendaftaran</a>
          <a href="#ringkasan">Ringkasan Transaksi</a>
        </span>
      </footer>
    </div>
  )
}