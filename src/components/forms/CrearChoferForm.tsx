import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { handleAxiosError } from "@/utils/handleErrors";
import { crearChofer } from "@/api/chofer";
import { UserPlus } from "lucide-react";

function CrearChoferFrom() {
  const { token } = useAuthStore();
  const [newDriver, setNewDriver] = useState({
    usuario: "",
    licencia_categoria: "",
    estado: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver({
      ...newDriver,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearChofer(
        {
          usuario: newDriver.usuario,
          licencia: newDriver.licencia_categoria,
          estado: newDriver.estado,
        },
        token
      );
      alert("Chofer creado con éxito!");
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">AGREGAR CHOFER</h2>
        <form onSubmit={handleCreateDriver} className="flex flex-col gap-4">
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={newDriver.usuario}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="licencia_categoria"
            placeholder="Licencia"
            value={newDriver.licencia_categoria}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={newDriver.estado}
            onChange={handleInputChange}
            className="p-2 border rounded-lg w-full"
            required
          />
          <button
            type="submit"
            className=" text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center bg-blue-900"
          >
            <UserPlus className="w-6 h-6 mr-2 " />
            <span>Agregar Chofer</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearChoferFrom;
