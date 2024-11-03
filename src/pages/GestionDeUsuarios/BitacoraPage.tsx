"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { bitacoraRequest } from "@/api/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BitacoraItem {
  id: number;
  id_bitacora: string;
  usuario_bitacora: string;
  tipo: string;
  accion: string;
  fecha: string;
  hora: string;
}

export default function BitacoraPage() {
  const { token } = useAuthStore();
  const [bitacora, setBitacora] = useState<BitacoraItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBitacora() {
      try {
        const bitacoraRes = await bitacoraRequest(token);
        setBitacora(bitacoraRes.data);
      } catch (error) {
        setError("Failed to fetch bitacora data. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBitacora();
  }, [token]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <Card className="max-w-4xl mx-auto border-zinc-200 shadow-md">
        <CardHeader className="border-b border-zinc-200 bg-zinc-100">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800">
            Bitácora de Base de Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="rounded-md border border-zinc-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-zinc-200 bg-zinc-100 hover:bg-zinc-100">
                    <TableHead className="text-zinc-700 font-semibold">
                      ID Bitácora
                    </TableHead>
                    <TableHead className="text-zinc-700 font-semibold">
                      Usuario
                    </TableHead>
                    <TableHead className="text-zinc-700 font-semibold">
                      Tipo
                    </TableHead>
                    <TableHead className="text-zinc-700 font-semibold">
                      Acción
                    </TableHead>
                    <TableHead className="text-zinc-700 font-semibold">
                      Fecha
                    </TableHead>
                    <TableHead className="text-zinc-700 font-semibold">
                      Hora
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bitacora.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-zinc-200 bg-white hover:bg-zinc-50"
                    >
                      <TableCell className="text-zinc-600">
                        {item.id_bitacora}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {item.usuario_bitacora}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {item.tipo}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {item.accion}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {item.fecha}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {item.hora}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
