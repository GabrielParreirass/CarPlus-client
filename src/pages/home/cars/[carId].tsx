import React, { useState } from "react";
import Image from "next/dist/client/image";
import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";
import axios from "axios";
import { useSession } from "next-auth/react";

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

const carPage = (vehicle: any) => {
  console.log(vehicle);

  if (!vehicle.vehicle) {
    return <div>Carregando Infos</div>;
  }

  const data = useSession();

  const { combine, allowedMaxDays, beforeToday, after, before } =
    DateRangePicker;

  const [inicialDate, setInicialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [modal, setModal] = useState("hidden");
  const [diarias, setDiarias] = useState(Number);
  const [date1Formated, setDate1Formated] = useState("")
  const [date2Formated, setDate2Formated] = useState("")
  const [currentUserEmail, setCurrentUserEmail] = useState(data.data?.user?.email)

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

    if (date2 > date1) {
      const date1Fm = new Date(d1).toLocaleDateString("en-GB");
      const date2Fm= new Date(d2).toLocaleDateString("en-GB");

      setDate1Formated(date1Fm)
      setDate2Formated(date2Fm)


      const diffInMs = date2 - date1;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      console.log(diffInDays);

      setDiarias(diffInDays);

      setModal("flex");
    } else {
      window.alert("Data inválida!")
    }
  };

  const handleCloseModal = () => {
    setModal("hidden");
  };

  const handleConfirm = () =>{
      axios.post("http://localhost:3001/createBooking", {
        date1: date1Formated,
        date2: date2Formated,
        dayQtd: diarias,
        value: diarias * parseInt(modalVehicle.price),
        currentUserEmail: currentUserEmail,
        carClass: modalVehicle.class
      }).then(res=>{
        console.log(res)
        if(res.status == 200){
          setModal("hidden");
          window.alert("Reserva feita com sucesso!")
        }
      })
      
  }

  const modalVehicle = vehicle.vehicle[0];

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
        <div className="text-white text-2xl">
          Veiculos classe {modalVehicle.class}
        </div>

        <div className="text-white text-lg mt-3">
          Diária: R${modalVehicle.price},00
        </div>

        <div className="flex">
          {vehicle.vehicle.map((item: any) => (
            <div>
              {" "}
              <Image
                src={`/${item.model}.webp`}
                width="240"
                height="240"
                alt="hb20"
              ></Image>{" "}
            </div>
          ))}
        </div>

        <div>
          <div className="text-xl font-bold text-white text-center p-3">
            Agendar aluguel
          </div>
          <div>
            <DateRangePicker
              character="/"
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
            className="py-2 px-4 bg-cyan-300 mt-4 rounded"
          >
            Confirmar reserva
          </button>
        </div>
      </div>

      <div className={modal}>
        <div className="bg-indigo-800 absolute left-1/2 right-1/2 w-1/2 h-96 -translate-x-1/2 -translate-y-1/2 text-white py-4 px-2 z-50 shadow-xl rounded-sm ">
          <div className="text-center font-semibold text-2xl">
            Deseja confirmar sua reserva?
          </div>
          <div className="mt-5">
            <div className="text-center text-lg">
              {diarias} dias x R${modalVehicle.price},00 
            </div>
            <div className="text-center text-lg">
              ( {date1Formated} até {date2Formated} )
            </div>
            <div className="text-center text-lg">
              Valor total = R${diarias * parseInt(modalVehicle.price)},00
            </div>
            <div className="text-center p-5">
              <button className="py-2 px-4 bg-cyan-300 mt-4 rounded font-bold text-black" onClick={()=> handleConfirm()}>
                Confirmar Reserva
              </button>
            </div>
            <p className="m-auto max-w-md text-gray-400 mt-5">
              Caso não existam veículos da classe selecionada no dia da
              retirada, será provido um veiculo de classe igual ou superior para
              o cliente.
            </p>
          </div>

          <div
            className="text-black absolute right-3 top-3 bg-white p-2 rounded-full cursor-pointer"
            onClick={() => {
              handleCloseModal();
            }}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
};

export default carPage;
