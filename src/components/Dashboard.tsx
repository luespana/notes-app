import { useApp } from "@/context/AppContext";
import { addData, deleteById, logOut, updateByColAndId } from "@/db/firebase";
import { TrashSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const { user, corchos, getCorchos, setCurrentCorcho, setCorchos } = useApp();
  const [editingCorcho, setEditingCorcho] = useState<any>(null);

  const handleNameChange = (e: any) => {
    setEditingCorcho({
      ...editingCorcho,
      name: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const corchosSin = corchos.filter((corcho: any) => {
        return corcho.id != editingCorcho.id;
      });
      const corchosActualizados = corchosSin.concat(editingCorcho);
      setCorchos(corchosActualizados);
      await updateByColAndId("corchos", editingCorcho.id, {
        name: editingCorcho.name,
      });
      setEditingCorcho(null);
    } catch (error) {
      console.log(error);
      toast.error("Error al guardar");
    }
  };

  const signOut = async () => {
    try {
      await logOut();
      setCorchos([]);
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Error al crear");
    }
  };

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
      console.log(error);
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
      <div className="flex w-full justify-between items-center px-2">
        <p></p>
        <h2 className="font-semibold text-2xl py-4">Tus Corchos</h2>
        <button
          className="rounded px-4 py-2 bg-red-400 text-white"
          onClick={signOut}
        >
          Cerrar sesion
        </button>
      </div>

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
              {editingCorcho ? (
                <input
                  type="text"
                  onChange={handleNameChange}
                  onPointerOut={handleUpdate}
                  value={editingCorcho.name}
                />
              ) : (
                <p className="w-full" onClick={() => setEditingCorcho(corcho)}>
                  {corcho.name}
                </p>
              )}
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
function updateCorchoName(id: any, newName: any) {
  throw new Error("Function not implemented.");
}
