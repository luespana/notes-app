import { useApp } from "@/context/AppContext";
import { getById } from "@/db/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function Corcho() {
  const router = useRouter();
  const { currentCorcho, setCurrentCorcho } = useApp();

  const getCorchoById = async () => {
    try {
      const corcho = await getById("corchos", router.query.id as string);
      setCurrentCorcho(corcho);
    } catch (error) {
      toast.error("Error al obtener corcho");
    }
  };

  useEffect(() => {
    if (currentCorcho === null && router.query.id) {
      getCorchoById();
    }
  }, [router.query.id]);

  if (currentCorcho === null) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="absolute top-4 mx-auto left-0 right-0 text-center">
        {currentCorcho.name}
      </p>
      <div className="w-[80vw] h-[80vh] bg-zinc-500 rounded-md p-6">
        <div className="w-full h-full bg-amber-700 rounded-md"></div>
      </div>
    </div>
  );
}
