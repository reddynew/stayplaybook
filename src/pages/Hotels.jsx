
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { useHotels } from "@/contexts/HotelContext";
import { AdSpaces } from "@/components/ads/AdSpaces";
import { HotelSearchForm } from "@/components/hotels/HotelSearchForm";
import { HotelCard } from "@/components/hotels/HotelCard";
import { BookingDialog } from "@/components/hotels/BookingDialog";
import MapView from "@/components/maps/MapView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapIcon, ListIcon } from "lucide-react";

const Hotels = () => {
  const { hotels, addBooking } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(1);
  const [location, setLocation] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [mapCenter, setMapCenter] = useState([-95.7129, 37.0902]); // Default US center
  const [mapZoom, setMapZoom] = useState(3.5);
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  const [highlightedHotelId, setHighlightedHotelId] = useState(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem("mapbox_token") || "");
  
  // Save token to localStorage when it changes
  useEffect(() => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
    }
  }, [mapboxToken]);

  const handleSearch = () => {
    if (!location) {
      toast.error("Please enter a location");
      return;
    }

    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    
    setFilteredHotels(filtered);
    
    // If we have results, center the map on the first result
    if (filtered.length > 0 && filtered[0].latitude && filtered[0].longitude) {
      setMapCenter([filtered[0].longitude, filtered[0].latitude]);
      setMapZoom(10);
    }
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

  const handleViewOnMap = (hotelId) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel && hotel.latitude && hotel.longitude) {
      setMapCenter([hotel.longitude, hotel.latitude]);
      setMapZoom(14);
      setViewMode("map");
      setHighlightedHotelId(hotelId);
    }
  };

  const handleMarkerClick = (hotelId) => {
    setHighlightedHotelId(hotelId);
    // Scroll to the hotel card if in dual view
    const element = document.getElementById(`hotel-${hotelId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Reset highlight when filtered hotels change
  useEffect(() => {
    setHighlightedHotelId(null);
  }, [filteredHotels]);

  // Prepare map markers from hotels
  const mapMarkers = filteredHotels
    .filter(hotel => hotel.latitude && hotel.longitude)
    .map(hotel => ({
      id: hotel.id,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      title: hotel.name,
      description: `$${hotel.price}/night`
    }));

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

            {/* Mapbox Token Input */}
            <div className="mb-4 p-4 border rounded-lg bg-white">
              <Label htmlFor="mapbox-token" className="block mb-2">
                Mapbox Token
              </Label>
              <div className="flex gap-2">
                <Input
                  id="mapbox-token"
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="Enter your Mapbox access token here"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open("https://mapbox.com/", "_blank");
                  }}
                >
                  Get Token
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Get your free token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a> and enter it here to enable maps
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-end gap-2">
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4 mr-1" /> List
              </Button>
              <Button 
                variant={viewMode === "map" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4 mr-1" /> Map
              </Button>
              <Button 
                variant={viewMode === "split" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setViewMode("split")}
              >
                Split View
              </Button>
            </div>

            {/* Content based on view mode */}
            {viewMode === "list" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => (
                  <div id={`hotel-${hotel.id}`} key={hotel.id}>
                    <HotelCard
                      hotel={hotel}
                      onBookNow={setSelectedHotel}
                      onViewOnMap={handleViewOnMap}
                      isHighlighted={hotel.id === highlightedHotelId}
                    />
                  </div>
                ))}
              </div>
            )}

            {viewMode === "map" && (
              <div className="h-[70vh] rounded-lg overflow-hidden">
                <MapView 
                  markers={mapMarkers} 
                  center={mapCenter} 
                  zoom={mapZoom}
                  onMarkerClick={handleMarkerClick}
                  mapboxToken={mapboxToken}
                />
              </div>
            )}

            {viewMode === "split" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                  {filteredHotels.map((hotel) => (
                    <div id={`hotel-${hotel.id}`} key={hotel.id}>
                      <HotelCard
                        hotel={hotel}
                        onBookNow={setSelectedHotel}
                        onViewOnMap={handleViewOnMap}
                        isHighlighted={hotel.id === highlightedHotelId}
                      />
                    </div>
                  ))}
                </div>
                <div className="h-[70vh] rounded-lg overflow-hidden sticky top-24">
                  <MapView 
                    markers={mapMarkers} 
                    center={mapCenter} 
                    zoom={mapZoom}
                    onMarkerClick={handleMarkerClick}
                    mapboxToken={mapboxToken}
                  />
                </div>
              </div>
            )}
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
