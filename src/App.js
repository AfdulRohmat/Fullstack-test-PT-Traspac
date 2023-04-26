import { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [find, setFind] = useState("");
  const [result, setResult] = useState(0);
  const [replace, setReplace] = useState("");
  const paragraphRef = useRef();

  const doFind = (e) => {
    e.preventDefault();
    let pattern = new RegExp(`${find}`, "gi");
    const innerText = paragraphRef.current.innerText;
    let count = innerText.match(pattern);
    if (count !== null) {
      setResult(count.length);
      toast.success(`${count.length} data berhasil ditemukan`);
    } else {
      toast.error(`Tidak data yang ditemukan`);
      setResult("no result");
    }
  };

  const doReplace = (e) => {
    e.preventDefault();
    let pattern = new RegExp(`${find}`, "gi");
    const innerText = paragraphRef.current.innerText;
    let replaceResult = innerText.replace(pattern, replace);
    paragraphRef.current.innerText = replaceResult;
    toast.success(`${result} data berhasil dirubah`);
    const timer = setTimeout(() => {
      setFind("");
      setReplace("");
    }, 300);
    clearTimeout(timer);
  };

  return (
    <div className="container mx-auto p-4 md:p-2 flex flex-col pb-10 justify-center items-center h-full">
      {/* Title */}
      <div>
        <Toaster />
      </div>
      <p className="m-4 text-neutral-700 font-semibold text-3xl">
        Find and Replace App
      </p>

      {/* FIND AND REPLACE */}
      <div className="flex my-4 flex-col w-full md:w-[60%] justify-center ">
        {/* find */}
        <label className="block text-gray-700  font-bold" hrmlFor="find">
          Find
        </label>
        <input
          value={find}
          onChange={(e) => setFind(e.target.value)}
          className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="find"
          type="text"
          placeholder="find"
        ></input>

        {/* Buttom Find */}
        <button
          disabled={find === ""}
          onClick={doFind}
          className="bg-blue-500 disabled:cursor-not-allowed mt-2 w-fit hover:bg-blue-700 text-white font-bold py-1 px-8 rounded"
        >
          Find
        </button>

        {result !== "no result" && find !== "" && (
          <>
            {/* replace */}
            <label
              className="block text-gray-700 mt-4  font-bold"
              htmlFor="replace"
            >
              Replace
            </label>
            <input
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="replace"
              type="text"
              placeholder="replace"
            ></input>

            {/* button Replace */}
            {result !== "no result" && (
              <button
                disabled={replace === ""}
                onClick={doReplace}
                className="bg-blue-500 mt-2 disabled:cursor-not-allowed w-fit hover:bg-blue-700 text-white font-bold py-1 px-8 rounded"
              >
                Replace
              </button>
            )}
          </>
        )}
      </div>

      {/* Find Result */}
      {result !== "no result" && (
        <p className="py-4 font-semibold">Hasil Pencarian : {result}</p>
      )}

      {/* Paragraf */}
      <div>
        <p ref={paragraphRef} className="text-justify">
          Dalam kehidupan suatu negara, pendidikan memegang peranan yang amat
          penting untuk menjamin kelangsungan hidup negara dan bangsa, karena
          pendidikan merupakan wahana untuk meningkatkan dan mengembangkan
          kualitas sumber daya manusia. Seiring dengan perkembangan teknologi
          komputer dan teknologi informasi, sekolah-sekolah di Indonesia sudah
          waktunya mengembangkan Sistem Informasi manajemennya agar mampu
          mengikuti perubahan jaman. SISKO mampu memberikan kemudahan pihak
          pengelola menjalankan kegiatannya dan meningkatkan kredibilitas dan
          akuntabilitas sekolah dimata siswa, orang tua siswa, dan masyakat
          umumnya.Penerapan teknologi informasi untuk menunjang proses
          pendidikan telah menjadi kebutuhan bagi lembaga pendidikan di
          Indonesia. Pemanfaatan teknologi informasi ini sangat dibutuhkan untuk
          meningkatkan efisiensi dan produktivitas bagi manajemen pendidikan.
          Keberhasilan dalam peningkatan efisiensi dan produktivitas bagi
          manajemen pendidikan akan ikut menentukan kelangsungan hidup lembaga
          pendidikan itu sendiri. Dengan kata lain menunda penerapan teknologi
          informasi dalam lembaga pendidikan berarti menunda kelancaran
          pendidikan dalam menghadapi persaingan global. Pemanfaatan teknologi
          informasi diperuntukkan bagi peningkatan kinerja lembaga pendidikan
          dalam upayanya meningkatkan kualitas Sumber Daya Manusia Indonesia.
          Guru dan pengurus sekolah tidak lagi disibukkan oleh
          pekerjaan-pekerjaan operasional, yang sesungguhnya dapat digantikan
          oleh komputer. Dengan demikian dapat memberikan keuntungan dalam
          efisien waktu dan tenaga. Penghematan waktu dan kecepatan penyajian
          informasi akibat penerapan teknologi informasi tersebut akan
          memberikan kesempatan kepada guru dan pengurus sekolah untuk
          meningkatkan kualitas komunikasi dan pembinaan kepada siswa. Dengan
          demikian siswa akan merasa lebih dimanusiakan dalam upaya
          mengembangkan kepribadian dan pengetahuannya. Sebagai contoh yang
          paling utama adalah sistem penjadwalan yang harus dilakukan setiap
          awal semester. Biasanya membutuhkan waktu lama untuk menyusun
          penjadwalan, Dengan SISKO dapat selesai dalam waktu singkat. Untuk
          mempermudah bagian administrasi kurikulum sekolah, SISKO menyediakan
          fasilitas istimewa yang merupakan inti dari sistem kurikulum sekolah
          yaitu membantu dalam pembuatan penjadwalan mata pelajaran sekolah yang
          dapat diproses tidak lebih lama dari 10 menit. Administrator hanya
          akan memasukkan kondisi dari masing-masing guru yang akan mengajar
          baik itu dalam 1 minggu seorang guru dapat mengajar berapa jam, selain
          itu dapat juga melakukan pemesanan tempat dan penempatan hari libur
          masing-masing guru dalam 1 minggu masa mengajar. Setelah semua kondisi
          dimasukkan, sistem akan memproses semua data tersebut sehingga
          menghasilkan jadwal yang optimal dan dapat langsung dipakai karena
          sistem akan mendeteksi sehingga tidak akan ada jadwal yang bertumpukan
          satu dengan yang lainnya. Setelah semua kondisi dimasukkan, sistem
          akan memproses semua data tersebut sehingga menghasilkan jadwal yang
          optimal dan dapat langsung dipakai karena sistem akan mendeteksi
          sehingga tidak akan ada jadwal yang bertumpukan satu dengan yang
          lainnya. Setelah permasalahan penjadwalan dapat ditangani dengan baik,
          hal yang tidak kalah pentingnya adalah memasukkan data siswa. Program
          SISKO telah menyediakan fasilitas untuk penanganan penilaian siswa
          yang secara langsung memasukkan nilai ke dalam raport dan siap
          dicetak. Untuk sistem penilaian siswa, yang dapat melakukan pengisian
          hanya Guru yang mengajar mata pelajaran. Sistem penilaian telah
          disesuaikan dengan KBK sehingga masingmasing guru dapat memasukkan
          deskripsi narasi dari mata pelajaran. Untuk menampilkan data penilaian
          dapat disesuaikan kembali dengan kebijaksanaan dari masing-masing
          lembaga pendidikan apakah ingin menampilkan data nilai akhir siswa
          maupun menampilkan data nilai siswa setiap kali mengadakan test
          ataupun tugas tertentu. Selain Modul untuk penjadwalan dan Modul
          Penilaian siswa, SISKO juga memberikan fasilitas untuk bagian
          administrasi keuangan sekolah dalam hal pembayaran SPP siswa. Bagian
          administrasi dapat langsung mengecek siapa siswa yang mempunyai
          tunggakan SPP dan untuk detail histori pembayaran SPP dari
          masing-masing siswa dapat dicetak seperti mencetak buku tabungan di
          bank sehingga mempermudah pekerjaan pihak administrasi keuangan.
          Administrasi keuangan dapat langsung melakukan pengaturan data
          pembayaran masing-masing siswa sesuai dengan kebutuhan dan dapat
          diubah sewaktu-waktu apabila ada kenaikan pembayaran SPP. Apabila
          siswa tersebut akan melakukan pembayaran, petugas dapat langsung
          memasukkan data. Hal sama juga dapat dilakukan untuk Data pembayaran
          Sumbangan Sukarela dan Tabungan Karyawisata.
        </p>
      </div>
    </div>
  );
}

export default App;
