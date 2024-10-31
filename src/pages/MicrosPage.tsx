// MicrosPage.tsx

function MicrosPage() {
  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-50 rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-zinc-800 mb-4 text-center">
        MANTENIMIENTO DE MICRO
      </h1>

      <h2 className="text-xl font-bold text-zinc-800">Registrar Micro</h2>

      {/* Fecha */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-zinc-700"
        >
          Fecha
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="mt-1 block w-full bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 focus:ring-zinc-500 focus:border-zinc-500"
        />
      </div>

      {/* Micro */}
      <div>
        <label
          htmlFor="micro"
          className="block text-sm font-medium text-zinc-700"
        >
          Micro
        </label>
        <input
          type="text"
          id="micro"
          name="micro"
          placeholder="Número de Micro"
          className="mt-1 block w-full bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 focus:ring-zinc-500 focus:border-zinc-500"
        />
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-zinc-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Descripción del micro"
          className="mt-1 block w-full bg-zinc-100 border border-zinc-300 rounded-md text-zinc-800 focus:ring-zinc-500 focus:border-zinc-500"
        />
      </div>

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="w-full mt-4 bg-zinc-700 text-white py-2 rounded hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
      >
        Guardar
      </button>
    </div>
  );
}

export default MicrosPage;
