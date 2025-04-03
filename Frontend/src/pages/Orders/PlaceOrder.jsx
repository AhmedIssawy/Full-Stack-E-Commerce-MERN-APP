import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import SkeletonID from "../../components/SkeletonID";
import { useCreateOrderMutation } from "../../app/api/orderApiSlice";
import { clearCartItems } from "../../app/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //   console.log(cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
      }).unwrap();
      console.log(res);

      dispatch(clearCartItems());
      navigate(`/order/${res.createdOrder._id}`, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty!</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left ">Product</td>
                  <td className="px-1 py-2 text-left ">Quantity</td>
                  <td className="px-1 py-2 text-left ">Price</td>
                  <td className="px-1 py-2 text-left ">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, i) => (
                  <tr key={i}>
                    <td className="p-2">
                      <img
                        onClick={() => navigate(`/product/${item._id}`)}
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover cursor-pointer"
                      />
                    </td>
                    <td className="p-2 underline">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2">
                      $ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text- 2xl font-semibold mb-5">Order Summery</h2>
          <div className="bg-[#253f63] p-8 text-white rounded-lg shadow-lg">
            <ul className="text-lg space-y-4">
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold">Items:</span>
                <span>${cart.itemsPrice}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold">Shipping Price:</span>
                <span>${cart.itemsPrice >= 100 ? 0 : cart.shippingPrice}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold">Tax Price:</span>
                <span>${cart.taxPrice}</span>
              </li>
              <li className="flex justify-between text-xl border-b mb-2 pb-2 font-bold pt-4">
                <span>Total Price:</span>
                <span>${cart.totalPrice}</span>
              </li>
            </ul>
            {error && (
              <Message variant={"danger"}>{error.data.message}</Message>
            )}
            <div className="pb-3 border-b">
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </div>
          </div>
          <button
            type="button"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
            className={`w-full mt-4 cursor-pointer px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300
    ${
      cart.cartItems.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-md"
    } text-white`}
          >
            Place Order
          </button>
          {isLoading && <SkeletonID />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
