import { FC } from "react";

export interface OptionButtonProps {
  onClick?: () => void;
  Icon: FC; 
  ariaLabel?: string
}

export const OptionButton: FC<OptionButtonProps> = ({ onClick, Icon, ariaLabel }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center justify-center text-center font-medium text-black gap-1 py-2 px-2 hover:opacity-90 lg:px-2 xl:px-2 hover:cursor-pointer rounded-md"
    aria-label={ariaLabel}
  >
    <Icon /> 
  </button>
);