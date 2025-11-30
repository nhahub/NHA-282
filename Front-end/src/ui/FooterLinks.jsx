/* eslint-disable react/prop-types */

function FooterLinks({ list, title }) {
  return (
    <div className="space-y-6">
      <h1 className="text-mblack tracking-wide uppercase text-lg md:text-xl font-semibold">
        {title}
      </h1>
      <ul className="space-y-5">
        {list.map((item, index) => (
          <li
            key={index}
            className="text-gray-400 text-base capitalize translate-x-0 hover:translate-x-4 duration-700 ease-in-out transition-all cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterLinks;
