import { Poppins } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";
import Dashboard from "./dashboard";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Poppins({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className={font.className}>
      <ToasterProvider />
      <Head>
        <title>Employe Dashboard</title>
      </Head>
      <Navbar hide={false} />
      <Dashboard />
      <div className="h-[5rem] bg-transparent"></div>
    </main>
  );
}
