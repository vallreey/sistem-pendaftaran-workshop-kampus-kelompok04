export const MAX_JENIS = 2;
export const MAX_KURSI = 7;

// Mengubah angka menjadi Rupiah yang sedang melemah gara-gara wowo
export const rupiah = (n) => {
  return "Rp " + Number(n).toLocaleString("id-ID");
};