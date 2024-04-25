"use client";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

interface Hotel {
  _id: string;
  hotelImage: string;
  hotelName: string;
  hotelFullAddress: string;
  hotelRating: number;
  hotelPhoneNumber: string;
  hotelEmail: string;
}

const Page: React.FC = () => {
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hoveredHotel, setHoveredHotel] = useState<string | null>(null);
  const [openModel , setOpenModel] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);



  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/hotels");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setHotels(data.hotels);
    } catch (error : any) {
      console.error("Error fetching hotels:", error.message);
    }
  };


  return (
    <div className="flex flex-wrap justify-center">
      {hotels?.map((hotel) => (
        <div
          key={hotel._id}
          className="max-w-sm rounded overflow-hidden shadow-2xl m-4 relative cursor-pointer"
          onMouseEnter={() => setHoveredHotel(hotel._id)}
          onMouseLeave={() => setHoveredHotel(null)}
        >
          <img
            className="w-full  max-h-[200px]"
            src={hotel.hotelImage}
            alt={hotel.hotelName}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer">
            {hoveredHotel === hotel._id && <EditIcon onClick={() => setOpenModel(true)} />}
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{hotel.hotelName}</div>
            <p className="text-gray-800 text-base">
              Address - {hotel.hotelFullAddress}
            </p>
            <p className="text-gray-700 text-base">
              Rating: {hotel.hotelRating}
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Phone: {hotel.hotelPhoneNumber}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Email: {hotel.hotelEmail}
            </span>
          </div>
          {
        openModel  && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg">
              <h1 className="text-2xl font-bold mb-5">Edit Hotel</h1>
              <form>
                <div className="flex items-center mb-5">
                  <label className="mr-5" htmlFor="hotelName">Hotel Name</label>
                  <input className="bg-[#f1f4f5] p-2" type="text" name="hotelName" id="hotelName" defaultValue={hotel.hotelName} />
                </div>
                <div className="flex items-center mb-5">
                  <label className="mr-5" htmlFor="hotelFullAddress">Hotel Full Address</label>
                  <input className="bg-[#f1f4f5] p-2"  type="text" name="hotelFullAddress" id="hotelFullAddress" defaultValue={hotel.hotelFullAddress} />
                </div>
                <div className="flex items-center mb-5">
                  <label className="mr-5" htmlFor="hotelRating">Hotel Rating</label>
                  <input className="bg-[#f1f4f5] p-2"  type="number" name="hotelRating" id="hotelRating" defaultValue={hotel.hotelRating} />
                </div>
                <div className="flex items-center mb-5">
                  <label className="mr-5" htmlFor="hotelPhoneNumber">Hotel Phone Number</label>
                  <input className="bg-[#f1f4f5] p-2"  type="text" name="hotelPhoneNumber" id="hotelPhoneNumber" defaultValue={hotel.hotelPhoneNumber} />
                </div>
                <div className="flex items-center mb-5">
                  <label className="mr-5" htmlFor="hotelEmail">Hotel Email</label>
                  <input className="bg-[#f1f4f5] p-2"  type="email" name="hotelEmail" id="hotelEmail" defaultValue={hotel.hotelEmail} />
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg ml-3" onClick={() => setOpenModel(false)}>Close</button>
              </form>
            </div>
          </div>
        )
      }
        </div>
      ))}
      
    </div>
  );
};

export default Page;
