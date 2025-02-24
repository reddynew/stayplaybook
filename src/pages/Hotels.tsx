import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const hotels = [
  {
    id: 1,
    name: "Luxury Resort & Spa",
    description: "5-star luxury resort with ocean views",
    price: 299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Miami Beach, FL",
  },
  {
    id: 2,
    name: "Urban Boutique Hotel",
    description: "Modern boutique hotel in city center",
    price: 199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Downtown Chicago, IL",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    description: "Cozy lodge with stunning mountain views",
    price: 249,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Aspen, CO",
  },
];

const Hotels = () => {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching with:", { location, checkIn, checkOut, guests });
  };

  const handleBook = (hotel: any) => {
    setSelectedHotel(hotel);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed", {
      hotel: selectedHotel,
      checkIn,
      checkOut,
      guests,
    });
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>Location</Label>
              <Input
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Guests</Label>
              <Input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Hotels
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle>{hotel.name}</CardTitle>
                <CardDescription>{hotel.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{hotel.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold">${hotel.price}</span>
                  <span className="text-gray-500"> / night</span>
                </div>
                <div className="mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{hotel.rating}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  onClick={() => handleBook(hotel)}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete your booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedHotel && (
                <>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedHotel.image}
                      alt={selectedHotel.name}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedHotel.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedHotel.location}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label>Check-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkIn && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Check-out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOut && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Number of Guests</Label>
                      <Input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                      onClick={handleConfirmBooking}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Hotels;
