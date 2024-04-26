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
  hotelAriName: string;
  hotelCitySlug: string;
  hotelLandmark: string;
  hotelEmail: string;
}

const Page: React.FC = () => {
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hoveredHotel, setHoveredHotel] = useState<string | null>(null);
  const [openModel , setOpenModel] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | any>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedHotel({...selectedHotel, [name]: value})
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch("https://staybook-api.vercel.app/api/hotels");
      // const response = await fetch("http://localhost:8000/api/hotels");
      // console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data)
      setHotels(data.hotels);
    } catch (error : any) {
      console.error("Error fetching hotels:", error.message);
    }
  };
  const handleEditClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    // console.log(selectedHotel);
    setOpenModel(true);
  };

  const handleEdit = async (selectedHotel: Hotel) => {
    // console.log(selectedHotel._id)
    const id = selectedHotel?._id;
    const formData = {
      hotelName: selectedHotel?.hotelName,
      hotelAriName: selectedHotel?.hotelAriName,
      hotelImage: selectedHotel?.hotelImage,
      hotelLandmark: selectedHotel?.hotelLandmark,
      hotelFullAddress: selectedHotel?.hotelFullAddress,
      hotelRating: selectedHotel?.hotelRating,
      hotelPhoneNumber: selectedHotel?.hotelPhoneNumber,
      hotelEmail: selectedHotel?.hotelEmail,
      hotelCitySlug: selectedHotel?.hotelCitySlug,
    };
    try {
      const response = await fetch(`https://staybook-api.vercel.app/api/hotels/${id}`, {
      // const response = await fetch(`http://localhost:8000/api/hotels/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Data Saved successfully");
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error submitting data:", error.message);
    }
  }
  // console.log(selectedHotel)


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
            {hoveredHotel === hotel._id && <EditIcon onClick={() => handleEditClick(hotel)} />}
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{hotel.hotelName}</div>
            <div className="font-bold text-sm mb-2">Ari Name -{hotel.hotelAriName}</div>
            <p className="text-gray-800 text-base">
              Address - {hotel.hotelFullAddress}
            </p>
            <p className="text-gray-800 text-base">
              Near By - {hotel.hotelLandmark}
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
        </div>
      ))}
      {
    openModel && selectedHotel  && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg">
          <h1 className="text-2xl font-bold mb-5">Edit Hotel</h1>
          <form>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelName">Hotel Name</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2" type="text" name="hotelName" id="hotelName" defaultValue={selectedHotel.hotelName} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelFullAddress">Hotel Full Address</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="text" name="hotelFullAddress" id="hotelFullAddress" defaultValue={selectedHotel.hotelFullAddress} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelRating">Hotel Rating</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="number" name="hotelRating" id="hotelRating" defaultValue={selectedHotel.hotelRating} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelCitySlug">Hotel City Slug</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="text" name="hotelCitySlug" id="hotelCitySlug" defaultValue={selectedHotel.hotelCitySlug} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelAriName">Hotel Ari Name</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="text" name="hotelAriName" id="hotelAriName" defaultValue={selectedHotel?.hotelAriName} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelLandmark">Hotel Landmark</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="text" name="hotelLandmark" id="hotelLandmark" defaultValue={selectedHotel.hotelLandmark} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelImage">Hotel Image</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="text" name="hotelImage" id="hotelImage" defaultValue={selectedHotel.hotelImage} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelPhoneNumber">Hotel Phone Number</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="text" name="hotelPhoneNumber" id="hotelPhoneNumber" defaultValue={selectedHotel.hotelPhoneNumber} />
            </div>
            <div className="flex items-center mb-5">
              <label className="mr-5" htmlFor="hotelEmail">Hotel Email</label>
              <input onChange={handleInputChange} className="bg-[#f1f4f5] p-2"  type="email" name="hotelEmail" id="hotelEmail" defaultValue={selectedHotel.hotelEmail} />
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg" onClick={() => handleEdit(selectedHotel)}>Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg ml-3" onClick={() => setOpenModel(false)}>Close</button>
          </form>
        </div>
      </div>
    )
  }
      
    </div>
  );
};

export default Page;
