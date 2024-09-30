import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import apiService from '../../services/ApiService';
import Breadcrumb from '../../components/Breadcrumb';

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Validation
  const validationSchema = yup.object({
    first_name: yup.string().required('First Name is Required'),
    last_name: yup.string().required('First Name is Required'),
    email: yup
      .string()
      .email(`${'InvalidEmail'}`)
      .required(`${'Email is Required'}`),

    // role: yup.string().required(`${t('ErrorRole')}`),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  //OnSubmit

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await apiService.put(`api/v1/admin/user/${id}`, values);
      if (response.data.success) {
        toast.success(`${response.data.message}`);

        navigate('/users');
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
  //get Data from Backend
  const getUserData = async () => {
    try {
      const response = await apiService.get(`api/v1/admin/user/${id}`, {});
      const { first_name, last_name, email } = response.data.data.user;

      setInitialValues({ first_name, last_name, email });
      formik.setValues({ first_name, last_name, email });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  //handle Cancel
  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <>
      <Breadcrumb pageName={'EditUser'} parentName={'UserManagement'} />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {('UpdateUser')}
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {'First Name'}
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder={'Enter First Name'}
                    value={formik.values.first_name}
                    className={`w-full rounded-lg border ${
                      formik.touched.first_name && formik.errors.first_name
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {'Last Name'}
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder={'Enter last Name'}
                    value={formik.values.last_name}
                    className={`w-full rounded-lg border ${
                      formik.touched.last_name && formik.errors.last_name
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {'Email'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={'Enter Email'}
                    value={formik.values.email}
                    className={`w-full rounded-lg border ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row">
                  <button
                    type="submit"
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray mb-2 md:mb-0 md:mr-2"
                  >
                    {loading ? (
                      <Spinner className="h-6 w-6" />
                    ) : (
                      `${('UpdateUser')}`
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    {('Cancel')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
