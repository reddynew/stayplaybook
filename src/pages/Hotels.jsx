
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { useHotels } from "@/contexts/HotelContext";
import { AdSpaces } from "@/components/ads/AdSpaces";
import { HotelSearchForm } from "@/components/hotels/HotelSearchForm";
import { HotelCard } from "@/components/hotels/HotelCard";
import { BookingDialog } from "@/components/hotels/BookingDialog";

const Hotels = () => {
  const { hotels, addBooking } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(1);
  const [location, setLocation] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const handleSearch = () => {
    if (!location) {
      toast.error("Please enter a location");
      return;
    }

    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    addBooking({
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      checkIn,
      checkOut,
      guests,
    });
    toast.success("Booking confirmed!");
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:pl-24">
        <AdSpaces>
          <div className="space-y-8">
            <HotelSearchForm
              location={location}
              setLocation={setLocation}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              guests={guests}
              setGuests={setGuests}
              onSearch={handleSearch}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onBookNow={setSelectedHotel}
                />
              ))}
            </div>
          </div>
        </AdSpaces>

        <BookingDialog
          hotel={selectedHotel}
          isOpen={!!selectedHotel}
          onClose={() => setSelectedHotel(null)}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          guests={guests}
          setGuests={setGuests}
          onBook={handleBook}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;
