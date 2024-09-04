import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CustomInput } from "../CustomInput/CustomInput";
import { FormValues, schema } from "../../models";



export const CustomForm = () => {
  // const [formValues, setFormValues] = React.useState<FormValues>({} as FormValues);
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput control={control} name="name" label="Name" error={errors.name}/>
      <CustomInput control={control} name="email" label="Email" error={errors.email}/>
      <CustomInput control={control} name="password" label="Password" error={errors.password}/>
      <CustomInput control={control} name="confirmPassword" label="Confirm Password" error={errors.confirmPassword}/>
      <button type="submit">Submit</button> 
    </form>
  )
};