import FilterSearch from './FilterSearch';
import Sorting from './Sorting';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Spinner,
} from '@material-tailwind/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
  useState,
} from 'react';
import CustomLoader from '../common/CustomLoader';
import apiService from '../services/ApiService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  userData: any;
  handleChange: any;
  handleSort: any;
  search: any;
  

  handlePopup: any;
  open: any;
  sortedInfo: any;
  loading: boolean;
  debouncedCallApi: any;
  getApiData: any;
  getPaginatedData: any;
  debouncedDefaultPageOneCallApi: any;
}

const DataTable: React.FC<Props> = ({
  userData,
  handleChange,
  handleSort,
  search,

  handlePopup,
  open,
  sortedInfo,
  loading,
  debouncedCallApi,
  getApiData,
  getPaginatedData,
  // debouncedDefaultPageOneCallApi,
}) => {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  //Delete the User
  const handleDelete = async (id: any) => {
    try {
      setIsDelete(true);
      const response = await apiService.delete(`api/v1/admin/user/${id}`);

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        getApiData();
        getPaginatedData();
        debouncedCallApi();
        // debouncedDefaultPageOneCallApi();
      }
      setIsDelete(false);
    } catch (error) {
      setIsDelete(false);
      console.log(error);
    }
  };

  //Navigate to Update User
  const handleEdit = (id: string) => {
    navigate(`/users/edit-user/${id}`);
  };

  return (
    <>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white dark:bg-meta-4 bg-opacity-75 z-50 flex items-center justify-center">
            <CustomLoader />
          </div>
        )}
        <div className={`relative ${loading ? 'blur-max' : ''}`}>
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div>{('First Name')} </div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'first_name'}
                        handleChange={handleChange}
                        isSubdomain={false}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'first_name'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div>{('Last Name')} </div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'last_name'}
                        handleChange={handleChange}
                        isSubdomain={false}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'last_name'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div>{('Email')} </div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'email'}
                        handleChange={handleChange}
                        isSubdomain={false}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'email'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
            
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  {('Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.length === 0 ? (
                <tr>
                  <td className="text-center py-5">
                    <p className="text-black text-center dark:text-white text-lg">
                      {('NoRecord')}
                    </p>
                  </td>
                </tr>
              ) : (
                userData?.map(
                  (
                    user: {
                      _id: any;
                      first_name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                      last_name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                      email:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                    },
                    index: Key | null | undefined,
                  ) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-8 dark:border-strokedark xl:pl-8">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.first_name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-8 dark:border-strokedark xl:pl-8">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.last_name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-10 xl:pl-8 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.email}
                        </p>
                      </td>
                      
                      <td className="border-b border-[#eee] py-5 px-4 pl-1 dark:border-strokedark">
                        <div className="flex items-center ">
                          <Tooltip content={('EditUser')}>
                            <IconButton
                              onClick={() => handleEdit(user?._id)}
                              variant="text"
                            >
                              <PencilSquareIcon className="h-4 w-4 text-primary" />
                            </IconButton>
                          </Tooltip>

                          <Popover
                            placement="left"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            open={open ? true : false}
                            // offset={{mainAxis: 100}}
                            // handler={(props) => console.log('props', props)}
                          >
                            <PopoverHandler>
                              {/* <button className="hover:text-primary"> */}
                              <Tooltip content={('DeleteUser')}>
                                <IconButton
                                  onClick={() => handlePopup(user?._id)}
                                  variant="text"
                                >
                                  <TrashIcon className="h-4 w-4 text-[#DC3545]" />
                                </IconButton>
                              </Tooltip>
                              {/* </button> */}
                            </PopoverHandler>
                            {open === user?._id && (
                              <PopoverContent>
                                <h3 className="text-[16px] text-black">
                                  {' '}
                                  {('Sure')}
                                </h3>
                                .
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => handlePopup('')}
                                    className="text-[16px] text-white p-2 w-[30%] rounded-md bg-[red] mr-7"
                                  >
                                    {('No')}
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user?._id)}
                                    className="text-[16px] text-white p-2 w-[30%] rounded-md bg-[green] flex justify-center items-center"
                                  >
                                    {isDelete ? (
                                      <Spinner className="h-6 w-6" />
                                    ) : (
                                      `${('Yes')}`
                                    )}
                                  </button>
                                </div>
                              </PopoverContent>
                            )}
                          </Popover>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DataTable;
