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

export const FichaPDFDocument = ({ fichasFiltradas: any }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Reporte de Sanciones</Text>
      <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableColHeader}>Fecha</Text>
          <Text style={styles.tableColHeader}>Hora</Text>
          <Text style={styles.tableColHeader}>Monto</Text>
          <Text style={styles.tableColHeader}>Estado</Text>
          <Text style={styles.tableColHeader}>Descripción</Text>
          <Text style={styles.tableColHeader}>Chofer</Text>
          <Text style={styles.tableColHeader}>Operador</Text>
        </View>
        {/* Filas de datos */}
        {fichasFiltradas.map((ficha: any, index: any) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{ficha.fecha}</Text>
            <Text style={styles.tableCol}>{ficha.hora}</Text>
            <Text style={styles.tableCol}>{ficha.monto}</Text>
            <Text style={styles.tableCol}>{ficha.estado}</Text>
            <Text style={styles.tableCol}>{ficha.descripcion}</Text>
            <Text style={styles.tableCol}>{ficha.usuario_chofer}</Text>
            <Text style={styles.tableCol}>{ficha.usuario_operador}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
