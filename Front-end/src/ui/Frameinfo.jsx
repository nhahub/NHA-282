/* eslint-disable react/prop-types */

function Frameinfo({ number, text }) {
  return (
    <div className="flex-col gap-2">
      <h1 className="font-bold text-4xl">{number.slice(0, -1)}+</h1>
      <p className="text-gray-500">{text} </p>
    </div>
  );
}

export default Frameinfo;
