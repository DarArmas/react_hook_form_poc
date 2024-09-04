
# React Hook Form with Zod and Custom Input Component

This project demonstrates the use of React Hook Form with Zod for form validation and a custom input component.

## Installation

To get started, install the required dependencies:

```bash
npm install react-hook-form @hookform/resolvers zod
```

# Project Structure
- src/models/index.ts: Contains the Zod schema for form validation and the FormValues interface.
- src/components/CustomInput/CustomInput.tsx: Contains the custom input component that uses React Hook Form's Controller component.
- src/components/CustomForm/CustomForm.tsx: Contains the main form component that uses React Hook Form's useForm hook and the custom input component.
Usage
1. Define the Zod schema and FormValues interface
In src/models/index.ts, define the Zod schema for form validation and the FormValues interface:


``` js
import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().refine((value, ctx) => value === ctx.parent.password, 'Passwords do not match'),
});

export type FormValues = z.infer<typeof schema>;
```
2. Create the custom input component
In src/components/CustomInput/CustomInput.tsx, create the custom input component that uses React Hook Form's Controller component:

```ts
import { Control, Controller, FieldError } from 'react-hook-form';
import './CustomInput.css';
import { FormValues } from '../../models';

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

export const CustomInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          <input id={name} {...field} type={type || 'text'} className={`form-control ${error && "is-invalid"}`} />
        }
      />
      {error && <p className='error'>{error.message}</p>}
    </div>
  );
};
```

3. Create the main form component
In src/components/CustomForm/CustomForm.tsx, create the main form component that uses React Hook Form's useForm hook and the custom input component:

```ts
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CustomInput } from "../CustomInput/CustomInput";
import { FormValues, schema } from "../../models";

export const CustomForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur", // recommendation
    defaultValues: { name: "Dar", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput control={control} name="name" label="Name" error={errors.name} />
      <CustomInput control={control} name="email" label="Email" error={errors.email} />
      <CustomInput control={control} name="password" label="Password" error={errors.password} />
      <CustomInput control={control} name="confirmPassword" label="Confirm Password" error={errors.confirmPassword} />
      <button type="submit">Submit</button>
    </form>
  );
};
```