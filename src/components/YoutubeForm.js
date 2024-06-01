import React from 'react'
import {useForm, useFieldArray} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let count=0;

export default function YoutubeForm() {
  // we can also set deafault values from api call
  // const form=useForm({
  //   defaultValues: async ()=>{
  //     const response= await fetch("https://jsonplaceholder.typicode.com/users/1");
  //     const data= await response.json();
  //     return {
  //       username: "Hamza",
  //       email: data.email,
  //       channel: ""
  //     };
  //   }
  // });

    const form=useForm({
      defaultValues: {
        username: "Hamza",
        email: "",
        channel: "",
        social: {
          facebook: "",
          twitter: ""
        },
        phonenumber: ["",""],
        phNumbers: [{number: ""}],
        age: 0,
        dob: new Date()
      },
      mode: "onSubmit"
    });
    // Mode can be onSubmit, onBlur, onTouched, onChange, all

    const {register, control, handleSubmit, formState, watch, getValues, setValue, trigger}=form;
    const {errors, dirtyFields, touchedFields, isDirty}=formState;

    console.log({dirtyFields, touchedFields, isDirty});
    // const watchForm=watch("username");
    const watchForm=watch(["username","email"]);

    const {fields, append, remove}=useFieldArray({
      name: 'phNumbers',
      control
    })

    function onSubmit(data){
      console.log("onsubmit Function",data);
    }

    function handlegetval(){
      console.log("Get Values",getValues());
    }

    function handleSetValues(){
      setValue("username", "", {
        shouldDirty:true,
        shouldTouch:true,
        shouldValidate:true
      })
    }

    count++;
  return (
    <div>
      <h1>Render {count/2}</h1>
      <h2>Watch {watchForm}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor="username">Username</label>
          {/* <input type="text" id="username" name="username" /> */}
          <input
            type="text"
            id="username"
            {...register("username", {
              required: 'name Field is Required'
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="email">E-mail</label>
        {/* <input type="email" id="email" name="email" /> */}
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate:{
              notAdmin: (fieldValue)=>{
                return (
                  fieldValue !== "admin@gmail.com" ||
                "Enter Another Email"
                )
              },
              notBlackListed: (fieldValue)=>{
                return (
                  !fieldValue.endsWith("bad@gmail.com") ||
                  "This domain is not supported"
                )
              }
            }
          })}
        />
        <p className='error'>{errors.email?.message}</p>
        </div>

        <label htmlFor="channel">Channel</label>
        {/* <input type="text" id="channel" name="channel" /> */}
        <input type="text" id="channel" {...register("channel",
        {required: 'Channel field is required'}
        )} />
        <p className='error'>{errors.channel?.message}</p>

        {/* Nested Objects video-13 */}
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} />

        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register("social.twitter")} />

        {/* Arrays video-14 */}
        <label htmlFor="primary">Primary</label>
        <input type="text" id="primary" {...register("phonenumber.0")} />

        <label htmlFor="secondary">Secondary</label>
        <input type="text" id="secondary" {...register("phonenumber.1")} />

        <div>
          <label htmlFor="">List of Numbers</label>
          <div>
            {
              fields.map((field,index)=>{
                return (<div className='form-control' key={field.id}>
                  <input 
                  type="text" 
                  {...register(`phNumbers.${index}.number`)} 
                  />
                  {
                    index > 0 && (
                      <button
                        onClick={() => remove(index)}>
                        Remove Field
                      </button>
                    )
                  }
                </div>)
              })
            }
            <button 
            onClick={()=>append({number: ""})}>
              Add Field
            </button>

          </div>
        </div>

        <label htmlFor="age">Age</label>
        {/* <input type="text" id="channel" name="channel" /> */}
        <input type="number" id="age" {...register("age",{
          valueAsNumber:true,
          required: 'Age field is required'
        })} />
        <p className='error'>{errors.age?.message}</p>

        <label htmlFor="dob">Age</label>
        {/* <input type="text" id="channel" name="channel" /> */}
        <input type="date" id="dob" {...register("dob",{
          valueAsDate:true,
          required: 'Date field is required'
        })} />
        <p className='error'>{errors.dob?.message}</p>

        <button>Submit</button>

        <button onClick={handlegetval}>getval</button>

        <button onClick={handleSetValues}>Set Values</button>

        <button onClick={()=>trigger()}>Validate</button>

      </form>
      <DevTool control={control} />
    </div>
  )
}
