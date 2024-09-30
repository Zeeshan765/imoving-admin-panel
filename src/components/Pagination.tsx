import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

interface Props {
  page: any;
  setPage: any;
  resultPerPage: any;
  setResultPerPage: any;
  debouncedCallApi: any;
  totalRecord: any;
}

const Pagination: React.FC<Props> = ({
  page,
  setPage,
  resultPerPage,
  setResultPerPage,
  debouncedCallApi,
  totalRecord,
}) => {



  const handleChange = (e: any) => {
    const { value } = e.target;
    if (resultPerPage != value) {
      setResultPerPage(value);
      debouncedCallApi();
    }
  };

  useEffect(() => {
    if (page * resultPerPage - resultPerPage + 1 > totalRecord) {
      setPage(1);
    }
  }, [page, resultPerPage, totalRecord]);

  const thousandsSeparators = (num: any) => {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };

  return (
    <>
      <div className="flex justify-between items-center p-3  ">
        {/* Results Per Page Select */}
        <div className="">
          <span className="text-md font-medium text-gray-600 dark:text-gray-400 mr-2">
          {('ResultPage')}
          </span>
          <select
            className="w-20 border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            name="resultPerPage"
            defaultValue="10"
            onChange={(e) => handleChange(e)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="text-md text-gray-600 dark:text-gray-400 flex items-center">
          {page !== 1 && page <= Math.ceil(totalRecord / resultPerPage) && (
            <span>
              <ArrowLeftIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  setPage((prevPage: number) => prevPage - 1);
                  debouncedCallApi();
                }}
              />
            </span>
          )}
           {('Displaying')} &nbsp;
          <span className="font-medium">
            {page * resultPerPage - resultPerPage + 1 > totalRecord
              ? 'Exceed limit '
              : page * resultPerPage - resultPerPage + 1}
          </span>
          &nbsp;
          {('to')}
          &nbsp;
          <span className="font-medium">
            {page * resultPerPage > totalRecord
              ? totalRecord
              : page * resultPerPage}
          </span>
          &nbsp;
          {('of')} {totalRecord > 0 && thousandsSeparators(totalRecord)}
          {Math.ceil(totalRecord / resultPerPage) > page && (
            <ArrowRightIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setPage((prevPage: number) => prevPage + 1);
                debouncedCallApi();
              }}
            />
          )}
        </div>
        <div className="flex items-center">
          <span className="text-md font-medium text-gray-600 dark:text-gray-400 mr-2">
          {('Page')}
          </span>
          <div className="relative">
            <input
              type="number"
              name="page"
              value={page}
              min={1}
              max={Math.ceil(totalRecord / resultPerPage)}
              className="py-1 px-2 text-md bg-transparent text-gray-600 dark:text-gray-400  dark:border-form-strokedark dark:bg-form-input w-16 focus:outline-none focus:ring-2"
              onChange={(e) => {
                setPage(e.target.value);
                debouncedCallApi();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
