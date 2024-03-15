import { useApp } from "@/context/AppContext";
import { getById, updateByColAndId } from "@/db/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Corcho() {
  const router = useRouter();
  const { currentCorcho, setCurrentCorcho } = useApp();
  const [editingPostIt, setEditingPostIt] = useState<string | null>(null);

  const createPostIt = async () => {
    try {
      await updateByColAndId("corchos", router.query.id as string, {
        postit: [...currentCorcho.postit, ""],
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al crear Post It");
    }
  };

  const handleNameChange = (e: any) => {
    setEditingPostIt(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const postitSin = currentCorcho.postit.filter((post: string) => {
        return post != editingPostIt;
      });
      const postitActualizados = postitSin.concat(editingPostIt);
      setCurrentCorcho({
        ...currentCorcho,
        postit: postitActualizados,
      });
      await updateByColAndId("corchos", router.query.id as string, {
        ...currentCorcho,
        postit: postitActualizados,
      });
      setEditingPostIt(null);
    } catch (error) {
      console.log(error);
      toast.error("Error al guardar");
    }
  };

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
    return <div></div>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="absolute top-4 mx-auto left-0 right-0 text-center">
        {currentCorcho.name}
      </p>
      <div className="w-[80vw] h-[80vh] bg-zinc-500 rounded-md p-6">
        <div className="w-full h-full bg-amber-500 rounded-md flex flex-wrap gap-4 p-4">
          {currentCorcho.postit.map((post: string) => {
            return (
              <div key={post} className="w-32 h-32 bg-green-200 p-2">
                {editingPostIt ? (
                  <input
                    type="text"
                    onChange={handleNameChange}
                    onPointerOut={handleUpdate}
                    value={editingPostIt}
                  />
                ) : (
                  <p className="w-full" onClick={() => setEditingPostIt(post)}>
                    {post}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute h-20 flex justify-center items-center border-black/50 rounded-t-full border bottom-0 mx-auto w-1/2 bg-white shadow-xl">
        <button
          className="bg-green-400 rounded-md text-center px-4 py-2 text-white font-semibold"
          onClick={createPostIt}
        >
          Crear
        </button>
      </div>
    </div>
  );
}
