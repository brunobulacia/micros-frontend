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

interface MantItem {
  id_mantenimiento: string;
  fecha: string;
  descripcion: string;
  id_micro: string;
  micro: {
    interno: string;
    placa: string;
  };
}

export const MantPDFDocument = ({
  mantFiltrados,
}: {
  mantFiltrados: MantItem[];
}) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Reporte de Mantenimientos</Text>
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableColHeader}>Fecha</Text>
          <Text style={styles.tableColHeader}>Descripción</Text>
          <Text style={styles.tableColHeader}>Placa</Text>
          <Text style={styles.tableColHeader}>Interno</Text>
        </View>
        {mantFiltrados.map((ficha, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{ficha.fecha}</Text>
            <Text style={styles.tableCol}>{ficha.descripcion}</Text>
            <Text style={styles.tableCol}>{ficha.micro.placa}</Text>
            <Text style={styles.tableCol}>{ficha.micro.interno}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
