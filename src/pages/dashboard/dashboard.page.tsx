/*import React from "react";
import { mockReservas } from "./path/to/mockReservas";
import ReservationCountChart from "./ReservationCountChart";
import ReservationsOverTimeChart from "./ReservationsOverTimeChart";
import ReservationStatusChart from "./ReservationStatusChart";
import { Bar } from 'react-chartjs-2';

const ReservationCountChart = ({ reservations }) => {
  const roomCounts = reservations.reduce((acc, reserva) => {
    acc[reserva.idSala] = (acc[reserva.idSala] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(roomCounts),
    datasets: [
      {
        label: 'Number of Reservations',
        data: Object.values(roomCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};
*/
const DashboardPage = () => {
  /*
  return (
    <div>
      <h1>Reservations Dashboard</h1>
      <div>
        <h2>Reservations Count by Room</h2>
        <ReservationCountChart reservations={reservations} />
      </div>
      <div>
        <h2>Reservations Over Time</h2>
        <ReservationsOverTimeChart reservations={reservations} />
      </div>
      <div>
        <h2>Reservation Statuses</h2>
        <ReservationStatusChart reservations={reservations} />
      </div>
    </div>
  );*/
  return <></>;
};

export default DashboardPage;
