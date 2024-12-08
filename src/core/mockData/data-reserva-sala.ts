import { ReservaSala } from "../ReservaSala/reserva-sala";
import mockSalaData from "./data-salas";

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateUniqueReservations = (
  idSala: number,
  count: number,
  startId: number // Added parameter for starting ID
): ReservaSala[] => {
  const reservations: ReservaSala[] = [];
  const overlappingDates = new Set<string>();

  let currentId = startId; // Initialize current ID

  while (reservations.length < count) {
    const startDate = getRandomDate(
      new Date(),
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    );

    const duration =
      Math.floor(Math.random() * (4 - 1 + 1) + 1) * 60 * 60 * 1000;
    const endDate = new Date(startDate.getTime() + duration);

    const dateKey = `${startDate.toISOString()}-${endDate.toISOString()}`;

    if (!overlappingDates.has(dateKey)) {
      reservations.push({
        fechaInicio: startDate,
        fechaFin: endDate,
        idSala,
        id: currentId++,
      });

      overlappingDates.add(dateKey);
    }
  }

  return reservations;
};

const generateReservationsForSala = (
  idSala: number,
  startId: number
): ReservaSala[] => {
  const count = Math.floor(Math.random() * (75 - 10 + 1)) + 10;
  return generateUniqueReservations(idSala, count, startId);
};

export const mockReservas: () => ReservaSala[] = () => {
  let currentReservationId = 1;

  return mockSalaData().flatMap((sala) =>
    generateReservationsForSala(sala.id as number, currentReservationId).map(
      (reservation) => {
        reservation.id = currentReservationId++;
        return reservation;
      }
    )
  );
};
