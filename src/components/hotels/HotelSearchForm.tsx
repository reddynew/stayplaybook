
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

interface HotelSearchFormProps {
  location: string;
  setLocation: (location: string) => void;
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  onSearch: () => void;
}

export const HotelSearchForm = ({
  location,
  setLocation,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  onSearch,
}: HotelSearchFormProps) => {
  return (
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
      <Button onClick={onSearch}>Search Hotels</Button>
    </div>
  );
};
