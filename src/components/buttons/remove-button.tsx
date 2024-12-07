import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { OptionButtonProps, OptionButton } from "./option-button";

export const RemoveButton: FC<Omit<OptionButtonProps, "Icon">> = ({
  onClick,
}) => <OptionButton onClick={onClick} Icon={FaTrashAlt} />;
