import { Pie } from "react-chartjs-2";
import { ReservaSala } from "../../core/ReservaSala/reserva-sala";

export const ReservationStatusChart = ({
  reservations,
}: {
  reservations: ReservaSala[];
}) => {
  const statusCounts = reservations.reduce((acc, reserva) => {
    acc[reserva.fechaInicio.toLocaleDateString()] =
      (acc[reserva.fechaInicio.toLocaleDateString()] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number; });

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Reservaciones por fecha",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};
