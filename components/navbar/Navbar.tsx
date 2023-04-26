import React, { use, useEffect, useState } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { headersConfigWithToken, baseUrl } from "@/network/NetworkSetup";
import { Toaster, toast } from "react-hot-toast";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface NavbarProps {
  hide?: boolean;
}

interface User {
  id?: number;
  username?: string;
  email?: string;
}

const Navbar: React.FC<NavbarProps> = ({ hide = false }) => {
  const [isLoading, setisLoading] = useState(false);
  const [loadingGetUser, setLoadingGetUser] = useState(false);
  const [dataUser, setDataUser] = useState<User>({});
  const router = useRouter();

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    setLoadingGetUser(true);
    axios
      .get(`${baseUrl}/user`, headersConfigWithToken)
      .then((response) => {
        setDataUser(response.data.data.user);
      })
      .catch((e) => {
        console.log("error", e);
        setLoadingGetUser(false);
      })
      .finally(() => {
        setLoadingGetUser(false);
      });
  };

  const doLogout = () => {
    setisLoading(true);
    axios
      .get(`${baseUrl}/logout`, headersConfigWithToken)
      .then((response) => {
        toast.success("Successfully logout");
        // console.log("data", response);
        deleteCookie("token");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Something went wrong");
        setisLoading(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  return (
    <>
      <Toaster />
      <div
        className={`navbar flex items-center justify-between bg-white-100 border-b-2 border-neutral-200
      ${hide ? "hidden" : "block"}
      `}
      >
        {/* LOGO */}
        <a className="btn btn-ghost normal-case text-xl">Employe Dashboard</a>

        {/* USER */}
        <div>
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 relative rounded-full ">
                <Avatar name="Foo Bar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border"
            >
              <li>
                <div className="justify-between">
                  {loadingGetUser ? "Please wait ..." : dataUser.username}
                </div>
              </li>
              <li onClick={doLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
