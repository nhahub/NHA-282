/* eslint-disable react/prop-types */

function FormInput({ formType, id, value, type, name, label, icon, register }) {
  if (type === "submit") {
    return (
      <div className="w-full flex justify-center ">
        <input
          type="submit"
          value={value}
          className=" mt-10 text-white cursor-pointer font-bold text-sm border-2  sm:text-sm whitespace-nowrap md:text-base bg-gray-500 px-10 md:px-10 py-3 rounded-full  w-2/3 hover:bg-black  hover:border-black hover:text-white hover:border-solid hover:scale-105 transition-all ease-in-out duration-150"
        />
      </div>
    );
  }
  if (formType === "payment") {
    return (
      <div className="bg-white p-4 rounded-lg pb-0 ">
        <div className="relative mt-1 bg-inherit flex">
          <input
            type={type}
            name={name}
            placeholder={label}
            id={id}
            {...register(name)}
            className="peer bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 px-5 ring-gray-500 focus:ring-gray-900 focus:outline-none"
          />
          <label
            htmlFor={id}
            className=" flex justify-left items-center absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-black peer-focus:text-sm transition-all"
          >
            <span className="text-xl mr-5">{icon}</span> {label}
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg pb-0 ">
      <div className="relative mt-1 bg-inherit flex">
        <input
          type={type}
          name={name}
          placeholder={label}
          id={id}
          {...register(name)}
          className="peer bg-transparent h-10 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 px-5 ring-gray-500 focus:ring-gray-900 focus:outline-none"
        />
        <label
          htmlFor={id}
          className=" flex justify-left items-center absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-black peer-focus:text-sm transition-all"
        >
          <span className="text-xl mr-5">{icon}</span> {label}
        </label>
      </div>
    </div>
  );
}

export default FormInput;
