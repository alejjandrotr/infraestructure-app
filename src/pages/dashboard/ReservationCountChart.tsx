import { Bar } from "react-chartjs-2";
import { ReservaSala } from "../../core/ReservaSala/reserva-sala";

export const ReservationCountChart = ({
  reservations,
}: {
  reservations: ReservaSala[];
}) => {
  const roomCounts = reservations.reduce((acc, reserva) => {
    const key = reserva.sala?.codigo || reserva.idSala;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as { [key: number | string]: number; });

  const data = {
    labels: Object.keys(roomCounts),
    datasets: [
      {
        label: "Number of Reservations",
        data: Object.values(roomCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  return <Bar data={data} />;
};
