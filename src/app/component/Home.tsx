"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import { MuiTelInput } from "mui-tel-input";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function valuetext(value: number) {
  return `${value}°C`;
}
const Form = () => {
  const [value, setValue] = React.useState<number | null>(2);
  const [phone, setPhone] = React.useState(""); 
  const [imageURL, setImageURL] = useState("");
  const [hotelData, setHotelData] = useState<any>();
  const [prevName, setPrevName] = useState<any>();

  const [options, setOptions] = useState<any>(false);
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHotelData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputURL = event.target.value;
    try {
      new URL(inputURL);
    }
    catch (error: any) {
      alert("Invalid Image link address copy the image link address")
    }
    const directURL = extractDirectImageURL(inputURL);
    setImageURL(directURL || "");
  };

  const extractDirectImageURL = (url: string) => {
    try {
      const urlParams = new URLSearchParams(new URL(url).search);
      const imageURLParam = urlParams.get("url");
      return imageURLParam || url;
    } catch (error: any) {
      console.error("Invalid URL:", url, "Error:", error.message);
      return null;
    }
  };
  const handleChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      hotelName: hotelData.hotelName,
      hotelAriName: hotelData.hotelAriName,
      hotelEmail: hotelData.hotelEmail,
      hotelFullAddress: hotelData.hotelFullAddress,
      hotelLandmark: hotelData.hotelLandmark,
      hotelCitySlug: hotelData.hotelCitySlug,
      hotelCityState: hotelData.hotelCityState,
      City: hotelData.City,
      Pincode: hotelData.Pincode,
      hotelImage: imageURL,
      hotelRating: value,
      hotelPhoneNumber: phone,
    };
    // console.log(formData)
    try {
      const response = await fetch("https://staybook-api.vercel.app/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Data submitted successfully");
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto  pt-5">
      <div className="pb-5 flex">
        <div>
          {imageURL && (
            <img
              src={imageURL}
              style={{ width: "200px", height: "60px" }}
              alt="Hotel"
            />
          )}
        </div>

        <div className="ml-[30%] w-[70%]">
          <label
            htmlFor="hotelImage"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel main image link
          </label>
          <input
            type="text"
            name="hotelImage"
            id="hotelImage"
            className="mt-1 p-2 border rounded-3xl w-full"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="hotelName"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Name
          </label>
          <input
            onFocus={() => setOptions(true)}
            type="text"
            name="hotelName"
            id="hotelName"
            pattern="[A-Za-z]+"
            value={hotelData?.hotelName || ""}
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
          {options && <div className="mt-2 flex gap-2">
            <button
              onClick={() => {
                setPrevName(hotelData.hotelName);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-green-900 font-bold rounded-2xl"
            >
              Save
            </button>
            <button
              onClick={() => {
                if (prevName && prevName !== hotelData.hotelName) {
                  setHotelData({ ...hotelData, hotelName: prevName });
                  setOptions(false);


                } else {
                  setOptions(false);
                }
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-orange-900 font-bold rounded-2xl"
            >
              Cancel
            </button>
          </div>}
        </div>
        <div>
          <label
            htmlFor="hotelAriName"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Ari Name
          </label>
          <input
            type="text"
            name="hotelAriName"
            id="hotelAriName"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div >
          <label
            htmlFor="hotelRating"
            className="block text-sm font-bold text-gray-700 mr-2"
          >
            Hotel Rating
          </label>
          <div className="flex items-center gap-5">
            <input
              type="number"
              value={value || 0}
              name="hotelRating"
              id="hotelRating"
              className="flex-grow p-2 border rounded-3xl mr-2 max-w-[110px]"
            />
            <Box
              sx={{
                "& > legend": { mb: 0 },
              }}
              className="gap-[-20px]"
            >
              <Rating name="simple-controlled" value={value} />
              <Box sx={{ width: 120 }}>
                <Slider
                  onChange={(event, newValue: any) => {
                    setValue(newValue);
                  }}
                  aria-label="Temperature"
                  defaultValue={1}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  shiftStep={30}
                  step={1}
                  marks
                  min={1}
                  max={5}
                />
              </Box>
            </Box>
          </div>
        </div>
        <div>
          <label
            htmlFor="hotelPhoneNumber"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Phone Number
          </label>
          <PhoneInput
            // className="bg-white mt-1 p-2 border rounded-3xl w-full"
            country={'in'}
            value={phone}
            onChange={handleChange}
          />
          {/* <MuiTelInput
            value={phone}
            onChange={handleChange}
            className="mui-tel-input bg-white  outline-none p-1 h-10 border-none rounded-3xl w-full"
          /> */}
        </div>
        <div>
          <label
            htmlFor="hotelEmail"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Email
          </label>
          <input
            type="email"
            name="hotelEmail"
            id="hotelEmail"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelFullAddress"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Full Address
          </label>
          <input
            type="text"
            name="hotelFullAddress"
            id="hotelFullAddress"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelLandmark"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Landmark
          </label>
          <input
            type="text"
            name="hotelLandmark"
            id="hotelLandmark"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelCitySlug"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel City Slug
          </label>
          <input
            type="text"
            name="hotelCitySlug"
            id="hotelCitySlug"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelState"
            className="block text-sm font-bold text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            name="hotelCityState"
            id="hotelCityState"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="City"
            className="block text-sm font-bold text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="City"
            id="City"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="Pincode"
            className="block text-sm font-bold text-gray-700"
          >
            Pincode
          </label>
          <input
            type="text"
            name="Pincode"
            id="Pincode"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
