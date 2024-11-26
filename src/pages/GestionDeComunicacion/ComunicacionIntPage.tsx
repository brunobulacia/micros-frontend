import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, Mensaje } from "@/types";
import { MessageCard } from "@/components/cards/messageCard.tsx";
const Chat = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");

  const token = useAuthStore.getState().token;
  const decodedToken: DecodedToken = jwtDecode(token);
  const lineaId = decodedToken.id_linea;
  const usuario = decodedToken.id;
  const rol = decodedToken.role;

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.emit("join-line", lineaId);

    socket.on("nuevo-mensaje", (nuevoMensaje: Mensaje) => {
      setMensajes((prev) => [...prev, nuevoMensaje]);
    });

    return () => {
      socket.disconnect();
    };
  }, [lineaId]);

  const enviarMensaje = () => {
    const nuevoMensaje = {
      emisor: usuario,
      receptor: "chofer123",
      contenido: mensaje,
      id_linea: lineaId,
      rol,
    };
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.emit("enviar-mensaje", nuevoMensaje);
    setMensaje("");
  };

  return (
    <div className="relative">
      <div className="flex flex-col overflow-auto h-[calc(100vh-4rem)] m-4 mb-20">
        {mensajes.map((msg: Mensaje, index) => (
          <MessageCard key={index} mensaje={msg} />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t flex items-center">
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje"
          className="flex-1 mr-2 p-2 border rounded-lg"
        />
        <button
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={enviarMensaje}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
