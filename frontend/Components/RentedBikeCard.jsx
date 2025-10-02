import { Link } from "react-router-dom";

export default function BikeCard({ rental }) {
  const { bike, startDate, _id } = rental;
  let bikeId = bike?._id || (bike && bike.$oid) || "";
  console.log("This is the BIkecard Data", rental);
  console.log("This is the BIkecard Data of id ", _id);
  

  return (
    <Link to={`/rentals/${bikeId}`}>
    
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
        <img
          src={bike?.Image?.[0] || "/placeholder.png"}
          alt={bike?.name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
        <h2 className="text-lg font-bold">{bike?.name}</h2>
        <p className="text-gray-600">₹{bike?.price} / day</p>
        <p className="text-sm text-gray-500">
          Rented on: {new Date(startDate).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
