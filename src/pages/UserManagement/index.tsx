import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import UserList from '../../components/users/UserList';
const UserManagement = () => {

  const navigate = useNavigate();

const handleNavigate = () =>{
  navigate('/panel/users/add-user')
}




  return (
    <>
      <Breadcrumb pageName={('Users')} parentName={('UserManagement')} />
      <div className="m-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold"></h2>
          {/* <button
          onClick={handleNavigate}
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            //  className="inline-flex items-center justify-center rounded-md border border-primary py-3 px-7 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            {('AddUser')}
          </button> */}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <UserList />
     </div>
    </>
  );
};

export default UserManagement;
