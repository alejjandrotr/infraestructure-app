import { extraData } from "../Base/dtos/api-config.interface";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { BaseRepository } from "../Base/repositories/repository.abstract";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { salaRepository } from "../Sala/sala.api";
import { ReservaSala } from "./reserva-sala";

interface Filter {
  fechaInicio?: Date;
  fechaFin?: Date;
}

class ReservaSalaApi extends BaseRepository<ReservaSala> {
  constructor() {
    super({
      path: ENTITIES_KEYS.RESERVA_SALA,
      type: RepositoryType.MOCK,
      labelName: "Reserva Sala",
    });
  }

  async get(extraData?: extraData<ReservaSala>): Promise<ReservaSala[]> {
    console.log(extraData);
    const isMock = this.getConfigRepositoryType() === RepositoryType.MOCK;

    const preparedExtraData = {
      ...extraData,
      filter:
        extraData?.filter && typeof extraData.filter !== "string"
          ? {
              ...extraData.filter,
              fechaFin: undefined,
              fechaInicio: undefined,
            }
          : extraData?.filter,
    };

    const data = await super.get(preparedExtraData);

    if (isMock && extraData?.filter && typeof extraData.filter !== "string") {
      const filteredData = this.applyFilter(data, extraData.filter);
      return this.mapSalas(filteredData);
    }

    return this.mapSalas(data);
  }

  private applyFilter(data: ReservaSala[], filter: Filter): ReservaSala[] {
    const { fechaInicio, fechaFin } = filter;

    return data.filter((reserva) => {
      if (fechaInicio && fechaFin) {
        return (
          (reserva.fechaInicio >= fechaInicio &&
            reserva.fechaInicio <= fechaFin) ||
          (reserva.fechaFin >= fechaInicio && reserva.fechaFin <= fechaFin)
        );
      }
      if (fechaInicio) {
        return (
          reserva.fechaInicio.toLocaleDateString() ===
          fechaInicio.toLocaleDateString()
        );
      }
      if (fechaFin) {
        return (
          reserva.fechaFin.toLocaleDateString() ===
          fechaFin.toLocaleDateString()
        );
      }
      return true;
    });
  }

  private async mapSalas(data: ReservaSala[]): Promise<ReservaSala[]> {
    const salasMap = await salaRepository.getOptionsMap();

    return this.sortEvents(data)
    .map((reserva) => ({
      ...reserva,
      sala: salasMap[reserva.idSala as number],
    }));
  }

  public sortEvents(data: ReservaSala[]): ReservaSala[] {
    const now = new Date();

    const upcoming = data
      .filter((reserva) => new Date(reserva.fechaFin) >= now)
      .sort(
        (a, b) =>
          new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime()
      );

    const past = data
      .filter((reserva) => new Date(reserva.fechaFin) < now)
      .sort(
        (a, b) =>
          new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime()
      );

    return [...upcoming, ...past];
  }
}

export const reservaSalaRespository = new ReservaSalaApi();
