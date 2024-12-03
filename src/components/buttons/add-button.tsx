import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

export const AddButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => (
  <Link
    to="#"
    className="inline-flex
               items-center
               justify-center text-center font-medium  text-white 
               gap-2.5
               bg-meta-4
               py-2 px-4
               hover:bg-opacity-90
               lg:px-8 xl:px-10
               rounded-md
               ml-2  hover:bg-gray-700
               "
    onClick={onClick}
  >
    <FaPlus /> Agregar Sala
  </Link>
);
