import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: 8,
    borderTopColor: "#4CAF50",
    borderTopWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 8,
  },
  tableColHeader: {
    width: "14.28%", // Divide el ancho en 7 columnas iguales
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol: {
    width: "14.28%",
    fontSize: 9,
    color: "#333",
    textAlign: "center",
  },
});

interface Estado {
  id_estado: string;
  estado: string;
  fecha: string;
  hora: string;
  id_micro: string;
}

interface InformacionesPersonales {
  nombre: string;
}

interface Dueño {
  id: string;
  id_informacion: string;
  informaciones_personale: InformacionesPersonales;
}

interface MicroItem {
  id_micro: string;
  placa: string;
  interno: string;
  modelo: string;
  año: string;
  seguro: string;
  id_dueño: string;
  id_linea: string;
  estados: Estado[];
  dueño: Dueño;
}

interface RevisionPDFProps {
  revFiltradas: MicroItem[];
}

export const RevisionPDF = ({ revFiltradas }: RevisionPDFProps) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Reporte de Micros</Text>
      <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableColHeader}>Año</Text>
          <Text style={styles.tableColHeader}>Modelo</Text>
          <Text style={styles.tableColHeader}>Seguro</Text>
          <Text style={styles.tableColHeader}>Placa</Text>
          <Text style={styles.tableColHeader}>Dueño</Text>
        </View>
        {/* Filas de datos */}
        {revFiltradas.map((rev, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{rev.año}</Text>
            <Text style={styles.tableCol}>{rev.modelo}</Text>
            <Text style={styles.tableCol}>{rev.seguro}</Text>
            <Text style={styles.tableCol}>{rev.placa}</Text>
            <Text style={styles.tableCol}>
              {rev.dueño.informaciones_personale.nombre}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
