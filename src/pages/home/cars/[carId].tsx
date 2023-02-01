import React, { useState } from "react";
import Image from "next/dist/client/image";
import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3001/getCars`);

  const data = await res.json();

  const paths = data.carsData.map((car: any) => {
    return {
      params: {
        carId: `${car._id}`,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const { params, req } = context;

  const res = await fetch(`http://localhost:3001/getCars/${params.carId}`);

  const data = await res.json();

  return {
    props: {
      vehicle: data.vehicle,
    },
  };
}

const carPage = ({
  vehicle,
}: {
  vehicle: {
    id: String;
    brand: String;
    model: String;
    year: String;
    price: String;
    description: String;
    class: String;
  };
}) => {
  console.log(vehicle);

  if (!vehicle) {
    return <div>Carregando Infos</div>;
  }

  const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

  const [inicialDate, setInicialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [modal, setModal] = useState("hidden");

  const handleSubmit = () => {
    // console.log(`Início:${inicialDate.getDate()}/${inicialDate.getMonth()+1}`)
    // console.log(`Final:${finalDate.getDate()}/${finalDate.getMonth()+1}`)

    let d1 = `${inicialDate.getFullYear()}-${
      inicialDate.getMonth() + 1
    }-${inicialDate.getDate()}`;
    let d2 = `${finalDate.getFullYear()}-${
      finalDate.getMonth() + 1
    }-${finalDate.getDate()}`;

    let date1: any = new Date(d1);
    let date2: any = new Date(d2);

    const diffInMs = date2 - date1;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    console.log(diffInDays);

    setModal("flex");
  };

  return (
    <>
      <div className="mt-5 ml-5">
        <a
          href="/home"
          className="bg-indigo-700 py-2 px-4 rounded text-white font-bold"
        >
          Home
        </a>
      </div>

      <div className=" m-5 py-4 px-8 bg-indigo-500  flex flex-col justify-center items-center rounded">
        <div className="text-white text-xl">
          {vehicle.brand} - {vehicle.model}
        </div>
        <div className="text-white text-lg">Ano {vehicle.year}</div>
        <div className="text-white text-lg">Diária: R${vehicle.price},00</div>
        <div className="text-sm">Classe {vehicle.class}</div>
        <div>
          {" "}
          <Image
            src={`/${vehicle.model}.webp`}
            width="240"
            height="240"
            alt="hb20"
          ></Image>{" "}
        </div>
        <div>
          <div className="text-xl font-bold text-white text-center p-3">
            Agendar aluguel
          </div>
          <div>
            <DateRangePicker
              showOneCalendar
              placeholder="Selecione o tempo de aluguel"
              disabledDate={combine!(allowedMaxDays!(100), beforeToday!())}
              onChange={(e) => {
                if (e == null) {
                  console.log("data invalida");
                } else {
                  setInicialDate(e![0]), setFinalDate(e![1]);
                }
              }}
              className="z-10"
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            className="py-2 px-4 bg-slate-400 mt-4 rounded"
          >
            Confirmar reserva
          </button>
        </div>
      </div>

      <div>
        <div className="bg-indigo-800 absolute left-1/2 right-1/2 w-1/2 h-96 -translate-x-1/2 -translate-y-1/2 text-white py-4 px-2 z-50 shadow-xl rounded-sm ">

          <div className="text-center font-semibold text-2xl">
            Deseja confirmar sua reserva?
          </div>

          <div className="text-black absolute right-3 top-3 bg-white p-2 rounded-full cursor-pointer">
            X
          </div>
        </div>
      </div>
    </>
  );
};

export default carPage;
