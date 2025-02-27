
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
import { Calendar as CalendarIcon, MapPin, Search, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const parks = [
  {
    id: 1,
    name: "Magic Kingdom",
    description: "Experience the magic of Disney's most iconic theme park",
    price: 109,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1620058695696-c11b12829ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Orlando, FL",
    attractions: ["Space Mountain", "Cinderella Castle", "Pirates of the Caribbean"],
  },
  {
    id: 2,
    name: "Universal Studios",
    description: "Movie magic comes to life in this exciting theme park",
    price: 99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1569861165146-c8fbf9c91dd6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Los Angeles, CA",
    attractions: ["Harry Potter World", "Jurassic World", "The Simpsons Ride"],
  },
  {
    id: 3,
    name: "Six Flags",
    description: "Thrilling rides and exciting attractions for all ages",
    price: 79,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1513889961551-628c1e489012?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    location: "Jackson, NJ",
    attractions: ["Kingda Ka", "El Toro", "Superman: Ultimate Flight"],
  },
];

const Parks = () => {
  const [selectedPark, setSelectedPark] = useState<any>(null);
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching with:", { location, date, guests });
  };

  const handleBook = (park: any) => {
    setSelectedPark(park);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed", {
      park: selectedPark,
      date,
      guests,
    });
    setSelectedPark(null);
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

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Location</Label>
              <Input
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label>Visit Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Number of Tickets</Label>
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
                Search Parks
              </Button>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parks.map((park) => (
                <Card key={park.id} className="overflow-hidden">
                  <img
                    src={park.image}
                    alt={park.name}
                    className="h-48 w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{park.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {park.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{park.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{park.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Popular Attractions:</strong>
                        <ul className="list-disc ml-4 mt-1">
                          {park.attractions.map((attraction, index) => (
                            <li key={index}>{attraction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">${park.price}</span>
                      <span className="text-gray-500"> / person</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                      onClick={() => handleBook(park)}
                    >
                      Book Tickets
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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

        <Dialog open={!!selectedPark} onOpenChange={() => setSelectedPark(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Your Tickets</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedPark && (
                <>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedPark.image}
                      alt={selectedPark.name}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedPark.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedPark.location}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label>Visit Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Number of Tickets</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                        />
                        <Users className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Price per ticket</span>
                        <span>${selectedPark.price}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${selectedPark.price * guests}</span>
                      </div>
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
      <Footer />
    </div>
  );
};

export default Parks;
