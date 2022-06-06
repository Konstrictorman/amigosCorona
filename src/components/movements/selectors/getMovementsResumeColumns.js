
import { currencyFormatter } from "../../../helpers/currencyFormatter"

export const getMovementsResumeColumns = () => {

   const columns = [
      {
			field: "saldoInicial",
			headerName: "Saldo Inicial",
			flex: 1,
			headerClassName: "headerCol2",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
      },
      {
			field: "ventas",
			headerName: "Ventas",
			flex: 1,
			headerClassName: "headerCol2",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
      },   
      {
			field: "devoluciones",
			headerName: "Devoluciones",
			flex: 1,
			headerClassName: "headerCol2",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
      },   
      {
			field: "otros",
			headerName: "Otros",
			flex: 1,
			headerClassName: "headerCol2",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
      },   
      {
			field: "movimientosPeriodo",
			headerName: "Movimientos Periodo",
			flex: 1,
			headerClassName: "headerCol2",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
      },   
      {
			field: "saldoFinal",
			headerName: "Saldo Final",
			flex: 1,
			headerClassName: "headerCol2",
			headerAlign: "center",
			type: "number",
			align: "right",
			valueFormatter: ({ value }) => currencyFormatter(value),
      },   
                        
   ];

   return columns;
};