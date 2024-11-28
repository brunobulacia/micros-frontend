import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, Mensaje } from "@/types";
import { MessageCard } from "@/components/cards/MessageCard.tsx";
import { getMensajes } from "../../api/mensajes.ts";

const Chat = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [linea, setLinea] = useState(0);
  const socketRef = useRef<Socket | null>(null); // Referencia al socket
  const bottomRef = useRef<HTMLDivElement>(null); // Referencia al final del chat

  const token = useAuthStore.getState().token;
  const decodedToken: DecodedToken = jwtDecode(token);
  const lineaId = decodedToken.id_linea;
  const usuario = decodedToken.id;
  const rol = decodedToken.role;

  useEffect(() => {
    const getMensajesResponse = async () => {
      const response = await getMensajes();
      setMensajes(response.data);
      scrollToBottom();
    };


    getMensajesResponse();
    
    setLinea(lineaId);

    // Configurar conexión única del socket
    socketRef.current = io("https://proyecto-micros.onrender.com", {
      withCredentials: true,
      transports: ["websocket"],
    });

    // Unirse a la línea
    socketRef.current.emit("join-line", lineaId);

    // Escuchar nuevos mensajes
    socketRef.current.on("nuevo-mensaje", (nuevoMensaje: Mensaje) => {
      setMensajes((prev) => {
        // Verificar si el mensaje ya existe
        if (prev.some((msg) => msg.id === nuevoMensaje.id)) {
          return prev;
        }
        return [...prev, nuevoMensaje];
      });
      scrollToBottom();
    });

    // Desconectar el socket al desmontar
    return () => {
      socketRef.current?.disconnect();
    };
  }, [lineaId]);

  const enviarMensaje = () => {
    if (mensaje.trim() === "") return;

    const nuevoMensaje = {
      id: Date.now().toString(), // Generar un ID único para el mensaje local
      emisor: usuario,
      contenido: mensaje.trim(),
      id_linea: lineaId,
      rol,
    };

    // Emitir mensaje usando la conexión existente
    socketRef.current?.emit("enviar-mensaje", nuevoMensaje);

    // Limpia el input de mensaje
    setMensaje("");
    scrollToBottom();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      enviarMensaje();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        CHAT LINEA {linea}
      </h1>
      <div className="w-full bottom-0 mb-8">
        <div className="bg-slate-300 rounded-lg p-4 border-t flex items-center">
          <input
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKeyDown} // Manejo de tecla Enter
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
      <div className="p-4 sm:p-6 bg-slate-300 rounded-lg h-[calc(85vh-8rem)]">
        <div className="flex flex-col overflow-auto h-[calc(80vh-8rem)] m-4 mb-20">
          {mensajes.map((msg: Mensaje, index) => (
            <MessageCard key={index} mensaje={msg} />
          ))}
          <div ref={bottomRef} /> {/* Referencia para desplazamiento */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
