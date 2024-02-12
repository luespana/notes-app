import { useApp } from "@/context/AppContext";
import { addData, deleteById } from "@/db/firebase";
import { TrashSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const { user, corchos, getCorchos, setCurrentCorcho } = useApp();

  const createNew = async () => {
    try {
      toast.loading("Creando...");
      await addData("corchos", {
        name: "Sin titulo",
        postit: [],
        userId: user.uid,
      });
      getCorchos();
      toast.dismiss();
      toast.success("Creado con exito");
    } catch (error) {
      toast.dismiss();
      toast.error("Error al crear");
    }
  };
  const deleteCorcho = async (id: string) => {
    try {
      toast.loading("Eliminando...");
      await deleteById("corchos", id);
      getCorchos();
      toast.dismiss();
      toast.success("Eliminado con exito");
    } catch (error) {
      toast.dismiss();
      toast.error("Error al eliminar");
    }
  };
  return (
    <div>
      <h2 className="text-center font-semibold text-2xl py-4">Tus Corchos</h2>
      <div className="flex flex-wrap p-12 h-[80vh] mx-12 gap-4 rounded-md border border-gray">
        <div
          className="w-60 h-44 bg-black/50 text-white rounded-lg text-4xl flex items-center justify-center cursor-pointer"
          onClick={createNew}
        >
          +
        </div>
        {corchos.map((corcho: any) => (
          <div key={corcho.id} className="flex flex-col gap-2">
            <div
              onClick={() => {
                setCurrentCorcho(corcho);
                router.push(`/${corcho.id}`);
              }}
              className="w-60 h-44 bg-gray-300 rounded-lg text-4xl flex items-center justify-center cursor-pointer"
            ></div>
            <div className="flex justify-between">
              <p>{corcho.name}</p>
              <TrashSimple
                size={20}
                className="cursor-pointer"
                onClick={() => deleteCorcho(corcho.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
