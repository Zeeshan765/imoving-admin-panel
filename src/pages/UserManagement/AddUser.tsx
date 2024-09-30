import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';
import apiService from '../../services/ApiService';
import Breadcrumb from '../../components/Breadcrumb';

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);
  //handle MultiSelect Value
  const handleSelectedChange = (option: any) => {
    const newValues = option.map((opt: any) => opt.value);
    console.log('selectedValues:', newValues);
    setSelectedOption(newValues);
  };
  //get Subdomain Listing
  const getSubdomainList = async () => {
    try {
      const response = await apiService.get('api/v1/admin/subdomains', {});
      const { records } = response.data.data.subDomains;
      const extractedOptions = records.map(
        ({ _id, host }: { _id: string; host: string }) => ({
          value: _id,
          label: host,
        }),
      );
      console.log('extractedOptions', extractedOptions)
      setOptions(extractedOptions);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getSubdomainList();
  }, []);

  // Validation
  const validationSchema = yup.object({
    name: yup.string().required(`${('ErrorName')}`),
    email: yup.string().email(`${('InvalidEmail')}`).required(`${t('ErrorEmail')}`),
    password: yup
      .string()
      .min(6, `${('PasswordMin')}`)
      .required(`${('ErrorPassword')}`),
    role: yup.string().required(`${('ErrorRole')}`),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  console.log(setInitialValues);
  //OnSubmit

  const onSubmit = async (values: any) => {
    const { role, ...rest } = values;
    try {
      setLoading(true);
      const response = await apiService.post('api/v1/admin/users', {
        ...rest,
        roles: [role],
        subDomains: selectedOption,
      });
      if (response.data.success) {
        toast.success(`${response.data.message}`);

        navigate('/panel/users');
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

  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/users');
  };

  //Check on the selected Options

  let updatedOptions = selectedValue === 'creator' ? options : [];

  return (
    <>
      <Breadcrumb pageName={('AddUser')} parentName={('UserManagement')} />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               {('AddNewUser')}
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                   {('Name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={('EnterFullName')}
                    className={`w-full rounded-lg border ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                  {('Email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={('EnterEmail')}
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

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                  {('Role')}
                  </label>
                  <select
                    name="role"
                    className={`w-full rounded border ${
                      formik.touched.role && formik.errors.role
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setSelectedValue(event.target.value); // Call your other function with the value
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  >
                    <option selected disabled value="">
                      Select the Role
                    </option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                  {formik.touched.role && formik.errors.role && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.role}
                    </div>
                  )}
                </div>

                {selectedValue === 'creator' && (
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                    {('SubDomain')}
                    </label>
                   
                  </div>
                )}

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                   {('Password')}
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder={('EnterPassword')}
                    className={`w-full rounded-lg border ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row">
                  <button
                    type="submit"
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray mb-2 md:mb-0 md:mr-2"
                  >
                    {loading ? <Spinner className="h-6 w-6" /> :`${('CreateUser')}`}
                  </button>
                  <button
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

export default AddUser;
