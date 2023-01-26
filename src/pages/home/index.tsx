import React from "react";
import { signOut, getSession } from "next-auth/react";
import { GetServerSideProps, GetStaticProps } from "next/types";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const vehicles = await prisma.vehicles.findMany();

  return {
    props: { user: session!.user!, vehiclesData: vehicles },
  };
};

const index = (props: any) => {
  console.log(props.vehiclesData);

  return (
    <div>
      <div className="flex w-full justify-around items-center bg-indigo-600 rounded-b-xl p-5">
        <div className="text-white text-xl w-1/3">
          Bem vindo, {props.user.name}
        </div>
        <h2 className=" text-2xl text-white w-1/3">CarPlus+</h2>
        <div
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="cursor-pointer bg-indigo-400 py-2 px-4 rounded  "
        >
          Deslogar
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-center py-4">
          A maior variedade, para você escolher!
        </h2>
        <div>
          {props.vehiclesData.map(
            (vehicle: {
              id: String;
              brand: String;
              model: String;
              year: String;
              price: String;
              description: String;
            }) => (
              <div className=" m-5 py-4 px-8 bg-indigo-500 w-1/3 flex flex-col justify-center items-center rounded" >
                <div className="text-white text-xl">
                  {vehicle.brand} - {vehicle.model}
                </div>
                <div className="text-white text-lg">Ano {vehicle.year}</div>
                <div className="text-white text-lg">Diária: R${vehicle.price},00</div>
                <div> <Image src={"/hb20.webp"} width="240" height="240" alt="hb20"></Image>  </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default index;

// user: {
//   name: string;
//   email: String;
//   image: String;
//   password?: String;
// }, vehiclesData:{

// }
