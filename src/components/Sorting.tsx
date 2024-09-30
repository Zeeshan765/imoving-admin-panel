import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
const Sorting = ({ name, sort, sortAs, handleSort }: any) => {
  let isAscending = sortAs === 'asc';
  let isDescending = sortAs === 'desc';
  let hasSort = sort === name;

  return (
    <div className="relative ml-2 mb-3 ">
      <ChevronUpIcon
        className={`w-4 h-4 absolute top-0 -translate-y-1/2 cursor-pointer`}
        onClick={() => handleSort(name)}
        style={{
          fill: hasSort && isAscending ? '#2563EB' : '#D1D5DB',
        }}
      />
      <ChevronDownIcon
        className="w-4 h-4 absolute top-0  translate-y-1/2 cursor-pointer"
        onClick={() => handleSort(name)}
        style={{
          fill: hasSort && isDescending ? '#2563EB' : '#D1D5DB',
        }}
      />
    </div>
  );
};

export default Sorting