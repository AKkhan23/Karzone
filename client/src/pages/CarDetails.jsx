 import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeatail } from "../feature/adim/adminSlice";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AddBooking, resetBookingState } from "../feature/Booking/bookingSlice";
import toast from "react-hot-toast";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car } = useSelector((state) => state.admin);
  const { isSucsess } = useSelector((state) => state.booking);

  const [form, setForm] = useState({ startDate: "", endDate: "" });

  // Move toast to useEffect
  useEffect(() => {
    if (isSucsess) {
      toast.success("Booking Confirm");

      dispatch(resetBookingState());
      
    }
  }, [isSucsess, dispatch]);

  useEffect(() => {
    dispatch(fetchDeatail(id));
  }, [id, dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = () => {
    if (!form.startDate || !form.endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    dispatch(AddBooking({ id: car._id, form }));
    setForm({ startDate: "", endDate: "" });
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/cars" className="text-blue-600 flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Cars
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <img
            src={car.imageUrl || car.image || car.photo || null}
            alt={car.name}
            className="w-full rounded-lg"
          />

          <div>
            <h1 className="text-4xl font-bold">{car.name}</h1>
            <p className="text-gray-600">{car.brand}</p>
            <p className="mt-4">{car.description}</p>
            <p className="text-3xl font-bold text-blue-600 mt-6">₹{car.price}/day</p>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Book Now</h2>

              <label className="block mb-1 font-semibold">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                name="startDate"
                onChange={handleChange}
                className="w-full mb-3 p-3 border rounded"
              />

              <label className="block mb-1 font-semibold">End Date</label>
              <input
                type="date"
                 value={form.endDate}

                name="endDate"
                onChange={handleChange}
                className="w-full mb-5 p-3 border rounded"
              />

              <button
                onClick={handleBooking}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
