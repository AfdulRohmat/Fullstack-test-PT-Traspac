import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Button from "@/components/button/Button";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, headersConfigWithToken } from "@/network/NetworkSetup";
import { columns } from "./dataSetup";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
  const [employesData, setEmployesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingExportPDF, setLoadingExportPDF] = useState(false);
  const [search, setSearch] = useState("");
  const [dataPage, setDataPage] = useState({
    page: 1,
    current_page: 1,
    from: 0,
    last_page: 0,
    per_page: 10,
    toPage: 0,
    totalData: 0,
  });
  const router = useRouter();

  useEffect(() => {
    getDataEmployes();
  }, [dataPage.page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getDataEmployes();
    }, 900);
    return () => clearTimeout(timer);
  }, [search]);

  const getDataEmployes = async () => {
    setLoading(true);
    axios
      .get(
        `${baseUrl}/employe?page=${dataPage.page}&per_page=${dataPage.per_page}&search=${search}`,
        headersConfigWithToken
      )
      .then((response) => {
        setEmployesData(response.data.data.data);
        setDataPage((prevState) => ({
          ...prevState,
          current_page: response.data.data.current_page,
          from: response.data.data.from,
          last_page: response.data.data.last_page,
          toPage: response.data.data.to,
          totalData: response.data.data.total,
        }));
      })
      .catch((e) => {
        console.log("error", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const goToNextPage = () => {
    if (dataPage.page != dataPage.last_page) {
      setDataPage((prevState) => ({
        ...prevState,
        page: dataPage.page + 1,
      }));
    } else return;
  };
  const goToPreviousPage = () => {
    if (dataPage.page != 1) {
      setDataPage((prevState) => ({
        ...prevState,
        page: dataPage.page - 1,
      }));
    } else return;
  };

  const changePage = ({ selected }: any) => {
    console.log("selected", selected);
    setDataPage((prevState) => ({
      ...prevState,
      page: selected + 1,
    }));
  };

  const exportPdf = async () => {
    setLoadingExportPDF(true);
    const doc = new jsPDF({ orientation: "landscape" });
    autoTable(doc, {
      head: [
        [
          "No",
          "NIP",
          "Nama",
          "Tempat Lahir",
          "Alamat",
          "Tanggal Lahir",
          "L/P",
          "Gol",
          "Eselon",
          "Jabatan",
          "Tempat Tugas",
          "Agama",
          "Unit Kerja",
          "No HP",
          "NPWP",
        ],
      ],
      body: employesData.map((data: any, index) => {
        return [
          index + 1,
          data.nip,
          data.fullname,
          data.tempat_lahir,
          data.alamat,
          data.tanggal_lahir,
          data.jenis_kelamin,
          data.group.name,
          data.echelon.name,
          data.position.name,
          data.tempat_tugas,
          data.religion.name,
          data.work_unit.name,
          data.no_HP,
          data.npwp,
        ];
      }),
      theme: "grid",
    });
    doc.save("employes.pdf");
    setLoadingExportPDF(false);
  };

  console.log("data page, ", dataPage);

  return (
    <>
      <div className="container mx-auto px-2">
        {/* TITLE */}
        <p className="flex items-center justify-center text-center mt-6 text-xl font-semibold">
          Data Employes XYZ Company
        </p>

        {/* SEARCH */}
        <div className="flex items-center justify-start w-full shadow-md h-[3rem] md:w-[60%] mx-auto relative mt-8 px-4 py-2 text-sm text-neutral-700 bg-white border border-neutral-300 rounded-lg focus:border-neutral-500 focus:ring-neutral-300 focus:ring focus:ring-opacity-40 ">
          <div className="flex w-full items-center gap-2 ">
            <CiSearch size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full focus:outline-none"
              placeholder="Please search by name..."
            />
          </div>
        </div>

        {loading ? (
          <p className="flex justify-center items-center">Loading</p>
        ) : (
          <>
            {/* TABLE */}
            <div>
              <div className="card w-full p-3 mt-4 bg-base-100 shadow-md rounded-xl overflow-hidden border">
                <DataTable
                  columns={columns}
                  data={employesData}
                  fixedHeader
                  responsive
                  striped
                  highlightOnHover
                  onRowClicked={(row, event) => {
                    router.push(`/detail-employe/${row.id}`);
                    console.log("id: ", row.id);
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6">
          {/* ---> on mobile <--- */}
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={goToPreviousPage}
              className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              className="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Next
            </button>
          </div>

          {/* ---> on web <--- */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">
                Showing {dataPage.current_page} to {dataPage.toPage} of{" "}
                {dataPage.totalData} results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <ReactPaginate
                  previousLabel={
                    <div className="flex justify-center items-center">
                      <AiOutlineLeft
                      size={18}
                      />
                    </div>
                  }
                  nextLabel={  <div className="flex justify-center items-center">
                  <AiOutlineRight
                  size={18}
                  />
                </div>}
                  pageCount={dataPage.last_page}
                  onPageChange={changePage}
                  className="flex justify-center border rounded-lg shadow-sm items-center p-3"
                  pageClassName="px-2 py-1 hover:bg-rose-500 hover:text-white hover:rounded-md mx-1"
                  activeLinkClassName="px-2 py-1 rounded-md bg-rose-500 text-white"
                  previousClassName="p-2 rounded-md bg-rose-500 text-white"
                  nextClassName="p-2 rounded-md bg-rose-500 text-white"
                />
              </nav>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="w-full md:w-[50%] flex justify-center items-center mt-10 mb-20 gap-4">
          <Button
            label="Add Employe"
            onButtonClick={() => router.push("/add-employe")}
          />
          <Button
            label="Export PDF"
            onButtonClick={exportPdf}
            outline={true}
            disabled={loadingExportPDF}
            icon={BsFiletypePdf}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
