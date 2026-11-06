import { MAX_JENIS, MAX_KURSI, rupiah } from '../utils.js'

export default function Summary({ totalKursi, jenis, sisaBatas, totalBiaya }) {
  const catatan = []
  if (totalKursi === 0) {
    catatan.push('Belum ada workshop dipilih.')
  } else {
    if (sisaBatas === 0) {
      catatan.push(`Batas ${MAX_KURSI} kursi sudah tercapai.`)
    }
    if (jenis >= MAX_JENIS) {
      catatan.push(
        `Batas ${MAX_JENIS} jenis sudah tercapai. Tambah kursi hanya pada workshop yang sudah dipilih.`
      )
    }
  }

  return (
    <section className="panel summary" id="ringkasan" aria-labelledby="ringkasan-title">
      <h2 id="ringkasan-title"><span className="heading-icon" aria-hidden="true">▦</span>Ringkasan Transaksi</h2>
      <div aria-live="polite" aria-atomic="true">
        <dl className="summary-limits">
          <div>
            <dt>Batas Jenis Workshop:</dt>
            <dd className={jenis >= MAX_JENIS ? 'is-limit' : ''}>{jenis} dari {MAX_JENIS}</dd>
          </div>
          <div>
            <dt>Kapasitas Kursi (Maks {MAX_KURSI}):</dt>
            <dd className={sisaBatas === 0 ? 'is-limit' : ''}>{totalKursi} kursi</dd>
          </div>
        </dl>
        <p className="remaining-seats">
          <span>Sisa kuota pemesanan:</span>
          <strong>{sisaBatas} kursi</strong>
        </p>
        <dl className="summary-costs">
          <div>
            <dt>Subtotal</dt>
            <dd>{rupiah(totalBiaya)}</dd>
          </div>
          <div>
            <dt>Biaya Layanan Kampus</dt>
            <dd className="free-label">Gratis</dd>
          </div>
          <div className="total">
            <dt>Total biaya</dt>
            <dd>{rupiah(totalBiaya)}</dd>
          </div>
        </dl>

        {catatan.length > 0 && (
          <ul className="summary__notes">
            {catatan.map((teks) => (
              <li key={teks}>{teks}</li>
            ))}
          </ul>
        )}
      </div>
      <p className="payment-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        Pembayaran aman via Virtual Account Bank
      </p>
    </section>
  )
}