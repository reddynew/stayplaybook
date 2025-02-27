
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingDialogProps {
  hotel: any;
  isOpen: boolean;
  onClose: () => void;
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  onBook: () => void;
}

export const BookingDialog = ({
  hotel,
  isOpen,
  onClose,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  onBook,
}: BookingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {hotel?.name}</DialogTitle>
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onBook}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
