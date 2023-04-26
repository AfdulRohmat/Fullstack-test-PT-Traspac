import Button from "@/components/button/Button";
import DropdownInput from "@/components/inputs/DropdownInput";
import TextInput from "@/components/inputs/TextInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import {
  headersConfig,
  baseUrl,
  headersConfigWithToken,
} from "@/network/NetworkSetup";

interface Props {}

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

const AddEmploye = () => {
  const [loadingAddData, setLoadingAddData] = useState(false);
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
    control,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      nip: "",
      fullname: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      alamat: "",
      pictureFile: File,
      no_HP: "",
      npwp: "",
      group_id: 0,
      echelon_id: 0,
      position_id: 0,
      tempat_tugas: "",
      religion_id: 0,
      work_unit_id: 0,
    },
  });
  const router = useRouter();

  useEffect(() => {
    getDataEchelons();
    getDataGroups();
    getDataPositions();
    getDataReligions();
    getDataWorkUnits();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoadingAddData(true);
    axios
      .post(
        `${baseUrl}/employe`,
        { ...data, pictureFile: data.pictureFile[0] },
        headersConfigWithToken
      )
      .then((response) => {
        toast.success("Success adding new data!");
        setTimeout(() => {
          router.push("/");
        }, 300);
      })
      .catch((e) => {
        console.log("error", e.response.data.message);
        toast.error(e.response.data.message);
        setLoadingAddData(false);
      })
      .finally(() => {
        setLoadingAddData(false);
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
              Add Employe
            </p>
            {/* NIP */}
            <TextInput
              id="nip"
              label="Nip"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* Fullname */}
            <TextInput
              id="fullname"
              label="Fullname"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* Tempat lahir */}
            <TextInput
              id="tempat_lahir"
              label="Tempat Lahir"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* tanggal lahir */}
            <TextInput
              id="tanggal_lahir"
              label="Tanggal Lahir"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* jenis kelamin */}
            <DropdownInput
              id="jenis_kelamin"
              label="Jenis kelamin"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
              dataOptions={jenisKelamin}
            />

            {/* alamat */}
            <TextInput
              id="alamat"
              label="Alamat"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* picture */}
            <div className="form-control  w-full max-w-xl mb-4">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("pictureFile", {
                  required: "Please choose a data",
                })}
              />
            </div>

            {/* no HP */}
            <TextInput
              id="no_HP"
              label="No HP"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* NPWP */}
            <TextInput
              id="npwp"
              label="NPWP"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* Group */}
            <DropdownInput
              id="group_id"
              label="Group"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
              dataOptions={groups}
            />

            {/* Echlon */}
            <DropdownInput
              id="echelon_id"
              label="echelon"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
              dataOptions={echelons}
            />

            {/* Position */}
            <DropdownInput
              id="position_id"
              label="Position"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
              dataOptions={positions}
            />

            {/* Tempat Tugas */}
            <TextInput
              id="tempat_tugas"
              label="Tempat Tugas"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
            />

            {/* Religion */}
            <DropdownInput
              id="religion_id"
              label="Religion"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
              dataOptions={religions}
            />

            {/* Work Unit */}
            <DropdownInput
              id="work_unit_id"
              label="Work Unit"
              disabled={loadingAddData}
              register={register}
              errors={errors}
              required={true}
              dataOptions={workUnits}
            />

            <Button
              disabled={loadingAddData}
              label="Add Employe"
              onButtonClick={handleSubmit(onSubmit)}
            />

            <div className="mb-14"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmploye;
