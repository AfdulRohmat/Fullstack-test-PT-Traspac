import { useRouter } from "next/router";
import { useRouter as routerNavigation } from "next/navigation";
import Button from "@/components/button/Button";
import DropdownInput from "@/components/inputs/DropdownInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import {
  headersConfig,
  baseUrl,
  headersConfigWithToken,
} from "@/network/NetworkSetup";

interface Props {}

interface Employe {
  id: any;
  nip: string;
  fullname: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat: string;
  picture: string;
  no_HP: string;
  npwp: string;
  tempat_tugas: string;
  group: {
    id: any;
    name: string;
  };
  echelon: {
    id: any;
    name: string;
  };
  position: {
    id: any;
    name: string;
  };
  religion: {
    id: any;
    name: string;
  };
  work_unit: {
    id: any;
    name: string;
  };
}

const jenisKelamin = [
  {
    id: "L",
    name: "Laki - Laki",
  },
  {
    id: "P",
    name: "Perempuan",
  },
];

const DetailEmploye = () => {
  const [loadingEditData, setloadingEditData] = useState(false);
  const [disableField, setDisableField] = useState(true);
  const [loadAgain, setLoadAgain] = useState(false);
  const [employeData, setEmployeData] = useState<Employe>({
    id: 0,
    nip: "",
    fullname: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    picture: "",
    no_HP: "",
    npwp: "",
    tempat_tugas: "",
    group: {
      id: 0,
      name: "",
    },
    echelon: {
      id: 0,
      name: "",
    },
    position: {
      id: 0,
      name: "",
    },
    religion: {
      id: 0,
      name: "",
    },
    work_unit: {
      id: 0,
      name: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [echelons, setEchelons] = useState([]);
  const [groups, setGroups] = useState([]);
  const [positions, setPositions] = useState([]);
  const [religions, setReligions] = useState([]);
  const [workUnits, setWorkUnits] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDataEchelons();
    getDataGroups();
    getDataPositions();
    getDataReligions();
    getDataWorkUnits();
  }, []);

  useEffect(() => {
    getEmployeById();
  }, [loadAgain]);

  useEffect(() => {
    if (employeData) {
      reset({
        nip: employeData.nip,
        fullname: employeData.fullname,
        tempat_lahir: employeData.tempat_lahir,
        tanggal_lahir: employeData.tanggal_lahir,
        jenis_kelamin: employeData.jenis_kelamin,
        alamat: employeData.alamat,
        pictureFile: null,
        no_HP: employeData.no_HP,
        npwp: employeData.npwp,
        group_id: employeData.group.id,
        echelon_id: employeData.echelon.id,
        position_id: employeData.position.id,
        tempat_tugas: employeData.tempat_tugas,
        religion_id: employeData.religion.id,
        work_unit_id: employeData.work_unit.id,
      });
    }
  }, [employeData]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { pictureFile, ...others } = data;
    console.log("data", data);

    setloadingEditData(true);
    axios
      .post(
        `${baseUrl}/employe/${employeData.id}`,
        pictureFile !== null
          ? {
              ...others,
              pictureFile: data.pictureFile[0],
              _method: "patch",
            }
          : {
              ...others,
              _method: "patch",
            },
        headersConfigWithToken
      )
      .then((response) => {
        toast.success("Success edit data!");
        setLoadAgain(!loadAgain);
        setDisableField(!disableField);
        console.log("data", response.data);
        // setTimeout(() => {
        //   routerNav.refresh();
        // }, 1000);
      })
      .catch((e) => {
        console.log("error", e.response.data.message);
        toast.error(e.response.data.message);
        setloadingEditData(false);
      })
      .finally(() => {
        setloadingEditData(false);
      });
  };

  const deleteData = async () => {
    setloadingEditData(true);
    axios
      .delete(`${baseUrl}/employe/${employeData.id}`, headersConfigWithToken)
      .then((response) => {
        toast.success("Success delete data");
        setTimeout(() => {
          router.push("/login");
        }, 300);
      })
      .catch((e) => {
        console.log("error data", e);
        toast.error(e.response.data.message);
        setloadingEditData(false);
      })
      .finally(() => {
        setloadingEditData(false);
      });
  };

  const getEmployeById = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/employe/${id}`, headersConfigWithToken)
      .then((response) => {
        setEmployeData(response.data.data);
      })
      .catch((e) => {
        console.log("error data", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDataEchelons = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/echelons`, headersConfigWithToken)
      .then((response) => {
        setEchelons(response.data.data);
      })
      .catch((e) => {
        console.log("error echelons", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDataGroups = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/groups`, headersConfigWithToken)
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch((e) => {
        console.log("error setGroups", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDataPositions = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/positions`, headersConfigWithToken)
      .then((response) => {
        setPositions(response.data.data);
      })
      .catch((e) => {
        console.log("error positions", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDataReligions = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/religions`, headersConfigWithToken)
      .then((response) => {
        setReligions(response.data.data);
      })
      .catch((e) => {
        console.log("error religions", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDataWorkUnits = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/work_units`, headersConfigWithToken)
      .then((response) => {
        setWorkUnits(response.data.data);
      })
      .catch((e) => {
        console.log("error work_units", e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        // MODAL
        <div className="container mx-auto px-2 w-full max-w-xl ">
          <Toaster />
          <div className="flex flex-col justify-center items-center my-2">
            <p className="flex items-center justify-center text-center mt-4 text-xl font-semibold">
              Edit Employe
            </p>
            {/* BLOK PICTURE */}
            <div className="avatar mt-8">
              <div className="w-48 rounded">
                <img src={employeData.picture} />
              </div>
            </div>

            <p className="text-neutral-600 font-semibold text-xl mt-2 mb-6">
              {employeData.fullname}
            </p>

            <div className="flex w-[50%] justify-start items-center">
              <Button
                outline={true}
                label="Edit Data"
                icon={BiEditAlt}
                onButtonClick={() => {
                  setDisableField(!disableField);
                }}
              />
            </div>

            {/* NIP */}
            <TextInput
              id="nip"
              label="Nip"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* Fullname */}
            <TextInput
              id="fullname"
              label="Fullname"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* Tempat lahir */}
            <TextInput
              id="tempat_lahir"
              label="Tempat Lahir"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* tanggal lahir */}
            <TextInput
              id="tanggal_lahir"
              label="Tanggal Lahir"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* jenis kelamin */}
            <DropdownInput
              id="jenis_kelamin"
              label="Jenis kelamin"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
              dataOptions={jenisKelamin}
            />

            {/* alamat */}
            <TextInput
              id="alamat"
              label="Alamat"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* picture */}
            <div className="form-control  w-full max-w-xl mb-4">
              <label className="label">
                <span className="labtext-sm font-semibold text-black p-1">
                  Picture
                </span>
              </label>
              <input
                disabled={loadingEditData || disableField}
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("pictureFile")}
              />
            </div>

            {/* no HP */}
            <TextInput
              id="no_HP"
              label="No HP"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* NPWP */}
            <TextInput
              id="npwp"
              label="NPWP"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* Group */}
            <DropdownInput
              id="group_id"
              label="Group"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
              dataOptions={groups}
            />

            {/* Echlon */}
            <DropdownInput
              id="echelon_id"
              label="echelon"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
              dataOptions={echelons}
            />

            {/* Position */}
            <DropdownInput
              id="position_id"
              label="Position"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
              dataOptions={positions}
            />

            {/* Tempat Tugas */}
            <TextInput
              id="tempat_tugas"
              label="Tempat Tugas"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
            />

            {/* Religion */}
            <DropdownInput
              id="religion_id"
              label="Religion"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
              dataOptions={religions}
            />

            {/* Work Unit */}
            <DropdownInput
              id="work_unit_id"
              label="Work Unit"
              disabled={loadingEditData || disableField}
              register={register}
              errors={errors}
              dataOptions={workUnits}
            />

            <div className="flex items-center justify-center gap-3 w-full mt-6">
              <Button
                disabled={loadingEditData || disableField}
                label="Edit Employe"
                onButtonClick={handleSubmit(onSubmit)}
              />
              <Button
                outline={true}
                disabled={loadingEditData}
                label="Delete Employe"
                onButtonClick={deleteData}
              />
            </div>

            <div className="mb-14"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailEmploye;
