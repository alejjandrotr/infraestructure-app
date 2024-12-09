import { ReservaSala } from "../../core/ReservaSala/reserva-sala";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { reservaSalaRespository } from "../../core/ReservaSala/reserva-sala.api";
import { useCallback, useEffect, useState } from "react";
import { ReservationsOverTimeChart } from "./ReservationsOverTimeChart";
import { ReservationStatusChart } from "./ReservationStatusChart";
import { ReservationCountChart } from "./ReservationCountChart";
import FilterList from "../ReservasSala/components/filter";
import { FilterProvider, useFilter } from "../../context/filter.context";

ChartJS.register(...registerables);

const DashboardPage = () => (
  <FilterProvider>
    <Dashboard />
  </FilterProvider>
);

const Dashboard = () => {
  const [reservations, setReservations] = useState<ReservaSala[]>([]);
  const { filter, setFilter } = useFilter();

  const updateData = useCallback(async () => {
    try {
      console.log({ filter });
      const fetchedData = await reservaSalaRespository.get({
        filter: filter as Partial<ReservaSala> | string,
      });
      setReservations(fetchedData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }, [filter]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <div className="dashboard-container w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
      <h1 className="text-2xl font-semibold mb-4">Panel de Reservas</h1>

      <FilterList
        onSearch={(data) => {
          setFilter(data);
        }}
      />

      <div className="chart-section mt-6">
        <h2 className="text-xl font-medium mb-2">Cantidad de Reservas por Sala</h2>
        <ReservationCountChart reservations={reservations} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="chart-section">
          <h2 className="text-xl font-medium mb-2">Estados de Reservas</h2>
          <ReservationStatusChart reservations={reservations} />
        </div>

        <div className="chart-section">
          <h2 className="text-xl font-medium mb-2">Reservas a lo Largo del Tiempo</h2>
          <ReservationsOverTimeChart reservations={reservations} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;