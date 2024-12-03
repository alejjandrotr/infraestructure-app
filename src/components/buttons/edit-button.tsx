import { FC } from 'react';
import { FaEdit } from 'react-icons/fa';
import { OptionButtonProps, OptionButton } from './option-button';

export const EditButton: FC<Omit<OptionButtonProps, 'Icon'>> = ({ onClick }) => (
  <OptionButton onClick={onClick} Icon={FaEdit} />
);
