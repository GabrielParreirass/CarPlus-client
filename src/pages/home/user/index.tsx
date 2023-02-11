import React from "react";
import { GetServerSideProps, GetStaticProps } from "next/types";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { useRef } from "react";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  console.log({ session: session });

  const userData = await prisma.users.findFirst({
    where: {
      email: session!.user!.email!,
    },
    include: {
      bookings: true,
    },
  });

  return {
    props: { user: userData },
  };
};

type UserData = {
  email: string;
  id: string;
};

const User = (props: {
  user: {
    email: string;
    id: string;
    username: string;
    bookings: [];
  };
}) => {


  console.log(props);

  const refDetails = useRef()


  const handleToggleDetails = (id:string) =>{

    const detailsContainer = document.getElementById(id)

    if(detailsContainer?.style.display == 'none'){
      detailsContainer.style.display = 'flex'
    }else{
      detailsContainer!.style.display = 'none'
    }

  }

  return (
    <div>
      <div><Link href={"/home"} className="cursor-pointer bg-indigo-600 px-2 py-4 flex justify-center align-center">Home</Link></div>
      <div className="text-xl p-2 text-center">Olá, {props.user.username}</div>
      <div className="text-xl p-2 text-center">
        Essas são suas reservas, aqui você pode cancelar ou ver os detalhes
        delas
      </div>
      <div className="text-center mt-5">
        {props.user.bookings.map(
          (booking: {
            carClass: string;
            date1: string;
            date2: string;
            id: string;
            ownerId: string;
            value: number;
            dayQtd: number;
          }) => (
            <div>
              <div className="p-4 pb-0 flex items-center justify-center">
                <div className="text-lg font-bold">
                  {booking.date1} até {booking.date2}
                </div>{" "}
                <div className="ml-2 cursor-pointer" onClick={() => handleToggleDetails(booking.id)}>Ver detalhes</div>
              </div>
              <div id={booking.id} style={{display:"none"}}>
                <div className="m-auto p-2">
                  <div>Reserva feita para carros de classe: {booking.carClass}</div>
                  <div>Duração de {booking.dayQtd} dias</div>
                  <div></div>
                  <div>Valor da reserva: {booking.value}</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default User;
