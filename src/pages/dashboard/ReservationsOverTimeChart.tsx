import { Line } from "react-chartjs-2";
import { ReservaSala } from "../../core/ReservaSala/reserva-sala";

export const ReservationsOverTimeChart = ({
  reservations,
}: {
  reservations: ReservaSala[];
}) => {
  const dates = {} as { [key: string]: number; };

  reservations.forEach((reserva) => {
    const date = reserva.fechaInicio.toLocaleDateString();
    dates[date] = (dates[date] || 0) + 1;
  });

  const data = {
    labels: Object.keys(dates),
    datasets: [
      {
        label: "Reservations Over Time",
        data: Object.values(dates),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};
