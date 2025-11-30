import { MdEmail } from "react-icons/md";
/* eslint-disable react/prop-types */
import FormInput from "./FormInput.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { PaymentSchema } from "../../utils/PaymentSchema.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../ui/FormError.jsx";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useState } from "react";
import { payCOD, payStripe } from "../../services/apiPayment.js";
import { useCartStore } from "../../Store.js";
// import { Checkbox } from "@material-tailwind/react";
// import { FaStripe } from "react-icons/fa";

const onPaySubmit = async (selected, cart, data) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    let res;
    if (selected === 1) {
      console.log("we pay using stripe");
      res = await payStripe(data, cart);
    } else {
      res = await payCOD(data, cart);
    }

    console.log("data is sent to backend", res);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

function PaymentForm({ setPayForm, orderSummary }) {
  const [selected, setSelected] = useState(null);
  const handleCheckboxChange = (checkboxId) => {
    setSelected(checkboxId);
  };
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const nav = useNavigate();
  // handleSubmit , register , formState: {error , isSubmitting}
  const payHook = useForm({
    resolver: zodResolver(PaymentSchema),
  });
  return (
    // <div className="flex flex-col md:flex-row">
    <form
      className="space-y-4 md:space-y-6 w-full md:grid md:grid-cols-2 text-right "
      onSubmit={payHook.handleSubmit(async (data) => {
        if (!selected) {
          toast.error("please Select a payment methon");
          return;
        }

        const res = await onPaySubmit(selected, cart, data);

        if (res.success) {
          const stripe = selected == 1;
          console.log("stripe", stripe);
          console.log("setpayform", setPayForm);
          console.log("clearcart", clearCart());

          payHook.reset();
          toast.success(`order Placed Successfullly`);
          clearCart();
          setPayForm(false);
          if (stripe) {
            window.location.href = res.session_url;
          } else {
            nav("/verify");
          }
        }
      })}
    >
      <div className="md:col-span-1">
        {/* frist name  */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"firstName"}
          id={"PayfirstName"}
          label={"First Name"}
          icon={<FaUser></FaUser>}
          register={payHook.register}
          required={true}
        ></FormInput>

        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.firstName?.message}
        />
        {/* second name  */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"secondName"}
          id={"PaysecondName"}
          label={"Second Name"}
          icon={<FaUser></FaUser>}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.secondName?.message}
        />

        {/* Email input */}
        <FormInput
          formType={"payment"}
          type={"email"}
          name={"email"}
          id={"PayEmail"}
          label={"Email address"}
          icon={<MdEmail></MdEmail>}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.email?.message}
        />

        {/* address */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"address"}
          id={"Payaddress"}
          label={"Pay Address"}
          icon={<FaAddressBook />}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.address?.message}
        />
        {/* city */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"city"}
          id={"Paycity"}
          label={"City Name"}
          icon={<MdOutlineLocationCity />}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.city?.message}
        />
        {/* state */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"state"}
          id={"Paystate"}
          label={"State Name"}
          icon={<MdOutlineLocationCity />}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.state?.message}
        />

        {/* zipcode */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"zipcode"}
          id={"Payzipcode"}
          label={"zip Code"}
          icon={<MdOutlineLocationCity />}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.zipcode?.message}
        />

        {/* country */}
        <FormInput
          formType={"payment"}
          type={"text"}
          name={"country"}
          id={"Paycountry"}
          label={"country Name"}
          icon={<FaMapMarkedAlt />}
          register={payHook.register}
          required={true}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.country?.message}
        />

        {/* Phone number */}
        <FormInput
          formType={"payment"}
          type={"tel"}
          name={"phone"}
          id={"PayPhone"}
          label={"Phone number"}
          icon={<BsFillTelephoneFill></BsFillTelephoneFill>}
          register={payHook.register}
        ></FormInput>
        <FormError
          type={"payment"}
          msg={payHook.formState?.errors?.phoneNumber?.message}
        ></FormError>
      </div>

      {/* check boxes */}
      <div>
        <div className="flex flex-col md:flex-row p-10 md:p-0 justify-evenly">
          <div
            onClick={() => handleCheckboxChange(1)}
            className={`cursor-pointer flex gap-2 items-center border-2 py-3 justify-center px-7 rounded-lg w-full md:w-1/3 ${
              selected == 1 ? "bg-black text-white" : "bg-gray-200 text-black"
            } font-bold text-xl mb-5`}
          >
            <label>Stripe</label>
          </div>

          <div
            onClick={() => handleCheckboxChange(2)}
            className={`cursor-pointer whitespace-nowrap flex gap-2 py-3 px-7 justify-center items-center border-2  rounded-lg w-full md:w-5/12 ${
              selected == 2 ? "bg-black text-white" : "bg-gray-200 text-black"
            } font-bold text-xl mb-5`}
          >
            <label>Cash on delivery</label>
          </div>
        </div>
        {orderSummary}

        <FormInput
          type={"submit"}
          value={payHook.formState.isSubmitting ? "Loading..." : "Place Order"}
        ></FormInput>
      </div>

      {/* <DevTool control={payHook.control} /> */}
    </form>
    // </div>
  );
}

export default PaymentForm;
