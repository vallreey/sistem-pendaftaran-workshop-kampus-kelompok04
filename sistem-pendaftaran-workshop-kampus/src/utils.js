export const MAX_JENIS = 2;
export const MAX_KURSI = 7;

// Mengubah angka menjadi format mata uang Rupiah
export const rupiah = (n) => {
  return "Rp " + Number(n).toLocaleString("id-ID");
};