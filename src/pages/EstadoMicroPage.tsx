function EstadoMicroPage() {
  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-900 rounded-xl shadow-md text-zinc-200">
      <h1 className="text-2xl font-bold text-zinc-50 mb-6 text-center">
        Actualizar Estado
      </h1>

      <form className="space-y-4">
        {/* Campo de Estado */}
        <div>
          <label
            htmlFor="estado"
            className="block text-zinc-400 text-sm font-medium mb-1"
          >
            Estado
          </label>
          <input
            type="text"
            id="estado"
            name="estado"
            className="w-full px-3 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-md focus:outline-none focus:border-zinc-500"
            placeholder="Escribe el estado del micro"
          />
        </div>

        {/* Campo de Fecha */}
        <div>
          <label
            htmlFor="fecha"
            className="block text-zinc-400 text-sm font-medium mb-1"
          >
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className="w-full px-3 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-md focus:outline-none focus:border-zinc-500"
          />
        </div>

        {/* Campo de Hora */}
        <div>
          <label
            htmlFor="hora"
            className="block text-zinc-400 text-sm font-medium mb-1"
          >
            Hora
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            className="w-full px-3 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-md focus:outline-none focus:border-zinc-500"
          />
        </div>

        {/* Botón de Actualizar Estado */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-zinc-700 text-zinc-100 font-medium rounded-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
          >
            Actualizar Estado
          </button>
        </div>
      </form>
    </div>
  );
}

export default EstadoMicroPage;
