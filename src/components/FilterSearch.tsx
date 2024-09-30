import React, { ChangeEvent } from 'react';

interface SearchProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name:string;
    isSubdomain:boolean;
}

const FilterSearch: React.FC<SearchProps> = ({
handleChange,
  name,
  isSubdomain
}) => {
  return (
    <input
      type="text"
      name={name}
      className={`${isSubdomain? 'w-30' : 'w-40'} border-[1.5px] border-stroke bg-transparent py-1 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
      // value={filterSearch}
      onChange={handleChange}
    />
  );
};

export default FilterSearch;
