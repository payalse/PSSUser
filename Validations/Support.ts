import * as yup from 'yup';

export const addSupport = yup.object().shape({
    title: yup.string().min(3, ({ min }) => `Title must be at least ${min} characters`)
        .required('Required')
        .required('Title is Required!'),
    description: yup.string().min(8, ({ min }) => `Description must be at least ${min} characters`)
        .required('Required')
        .required('Description is Required!'),
    subject: yup.string()
        .required('Required')
        .required('Please add a subject'),
});