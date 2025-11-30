/* eslint-disable react/prop-types */
function FormError({ type, msg }) {
  if (type === "payment") {
    return <p className="w-10/12 text-red-600 text-left m-2 pl-5 h-1">{msg}</p>;
  }

  return <p className="w-10/12 text-red-600 text-left pl-5 h-1">{msg}</p>;
}

export default FormError;
