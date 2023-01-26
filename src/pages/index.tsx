import Header from "@/components/Header";
import LoginSection from "@/components/LoginSection";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };


  }

  return {
    props: {},
  };
};

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Header />
      <LoginSection />
    </>
  );
}
