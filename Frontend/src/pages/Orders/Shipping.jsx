import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../app/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
("../../app/features/cart/cartSlice.js");
const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress  = {} } = cart;
  // console.log(cart);
  
  const [fullInformation, setFullInformation] = useState({
    paymentMethod: "PayPal",
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(cart);
  const handleChange = (e) => {
    setFullInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(fullInformation);
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { address, city, postalCode, country } = fullInformation;
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(fullInformation.paymentMethod));
    navigate("/place-order");
  };

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              required
              name="address"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Address"
              value={fullInformation.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter City"
              value={fullInformation.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Postal-Code"
              value={fullInformation.postalCode}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Country</label>
            <input
              type="text"
              name="country"
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Country"
              value={fullInformation.country}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2">
              <label
                htmlFor="paymentMethod"
                className="inline-flex items-center"
              >
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  required
                  id="paymentMethod"
                  value={fullInformation.paymentMethod}
                  checked={fullInformation.paymentMethod === "PayPal"}
                  onChange={handleChange}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
          </div>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
