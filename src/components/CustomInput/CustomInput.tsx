import { Control, Controller, FieldError } from 'react-hook-form';
import './CustomInput.css';

interface Props{
    name: string;
    control: Control<any>;
    label: string;
    type?: string;
    error?: FieldError;
}

export const CustomInput = ({name, control, label, type, error}: Props) => {
  return (
    <div className='form-group'>
        <label htmlFor={name}>{label}</label>
        <Controller
        name={name}
        control={control}
        render={({field}) => 
            <input id={name} {...field} type={type || 'text'} className={`form-control ${error && "is-invalid"}`} />
        }/>
        {error && <p className='error'>{error.message}</p>}
    </div>
  )
}
