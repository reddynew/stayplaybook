
import { createContext, useContext, useState } from "react";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels] = useState([
    {
      id: 1,
      name: "Luxury Resort & Spa",
      location: "Miami Beach, FL",
      price: 299,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Experience luxury living with ocean views and world-class amenities."
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      location: "Aspen, CO",
      price: 199,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Cozy mountain retreat with stunning views and ski-in/ski-out access."
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "New York City, NY",
      price: 349,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Sophisticated urban oasis in the heart of Manhattan."
    }
  ]);

  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, { ...booking, id: Date.now() }]);
  };

  return (
    <HotelContext.Provider value={{ hotels, bookings, addBooking }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotels must be used within a HotelProvider");
  }
  return context;
};
