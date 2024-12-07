import { confirmAlert } from "react-confirm-alert";
import { extraData } from "../Base/dtos/api-config.interface";
import { RepositoryType } from "../Base/enums/RepositoryType";
import {
  BaseRepository,
  BaseRepositoryFactory,
} from "../Base/repositories/repository.abstract";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { Asiento } from "./asiento";

type AsientoExtraData = extraData<Asiento> & {
  idSala: number | string;
};

class AsientoApi extends BaseRepository<Asiento> {
  public labelNamel?: string | undefined = "Asiento";
  constructor() {
    super({
      path: ENTITIES_KEYS.ASIENTOS,
      type: RepositoryType.MOCK,
      labelName: "Asiento",
    });
  }

  public generateSalaPath(idSala?: string | number): string {
    return ENTITIES_KEYS.SALA + "/" + idSala;
  }

  public get(extraData: AsientoExtraData): Promise<Asiento[]> {
    const { idSala, ...rest } = extraData;
    return super.get({ ...rest, prePath: this.generateSalaPath(idSala) });
  }

  public add(newItem: Asiento, extraData: AsientoExtraData) {
    const { idSala, ...rest } = extraData;
    return super.add(newItem, {
      ...rest,
      prePath: this.generateSalaPath(idSala),
    });
  }

  public edit(
    id: number | string,
    newItem: Asiento,
    extraData: AsientoExtraData
  ) {
    const { idSala, ...rest } = extraData;
    return super.edit(id, newItem, {
      ...rest,
      prePath: this.generateSalaPath(idSala),
    });
  }

  async showDeleteMsg(
    e: Asiento & { id?: string | number },
    idSala?: number | string
  ) {
    if (e.id === undefined) return;
    const options = {
      title: "Eliminar " + this.labelNamel,
      message: `¿Desea eliminar este elemento:  ${this.labelNamel}?`,
      buttons: [
        {
          label: "Si",
          onClick: () =>
            this.delete(e.id || -1, {
              prePath: this.generateSalaPath(idSala),
            }),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };
    confirmAlert(options);
  }
}
export const asientosRepository = new AsientoApi();
