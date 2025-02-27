
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHotels } from "@/contexts/HotelContext";

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
        {/* Top Banner Ad */}
        <div className="w-full h-[90px] bg-gray-100 rounded-lg mb-8 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Advertisement Banner (728x90)
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sidebar Ad (160x600)
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter city or state"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Check-in Date</Label>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label>Check-out Date</Label>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <Button onClick={handleSearch}>Search Hotels</Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle>{hotel.name}</CardTitle>
                      <CardDescription>{hotel.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">${hotel.price}/night</p>
                      <p className="text-gray-600">{hotel.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setSelectedHotel(hotel)}>
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sidebar Ad (160x600)
              </div>
            </div>
          </div>
        </div>

        <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book {selectedHotel?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Check-in Date</Label>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  className="rounded-md border"
                />
              </div>
              <div>
                <Label>Check-out Date</Label>
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  className="rounded-md border"
                />
              </div>
              <div>
                <Label htmlFor="booking-guests">Number of Guests</Label>
                <Input
                  id="booking-guests"
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedHotel(null)}>
                Cancel
              </Button>
              <Button onClick={handleBook}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;
