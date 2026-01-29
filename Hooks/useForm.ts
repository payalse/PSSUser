import {useFormik} from 'formik';

const useForm = ({initialValues, validationSchema, onSubmit}: any) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return formik;
};

export default useForm;
