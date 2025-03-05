
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    price: number;
    description: string;
    image: string;
    latitude?: number;
    longitude?: number;
  };
  onBookNow: (hotel: any) => void;
  onViewOnMap?: (hotelId: number) => void;
  isHighlighted?: boolean;
}

export const HotelCard = ({ 
  hotel, 
  onBookNow, 
  onViewOnMap,
  isHighlighted = false 
}: HotelCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${isHighlighted ? 'ring-2 ring-primary shadow-lg' : ''}`}>
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{hotel.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {hotel.location}
            </CardDescription>
          </div>
          {hotel.latitude && hotel.longitude && onViewOnMap && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-8 w-8"
              onClick={() => onViewOnMap(hotel.id)}
              title="View on map"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${hotel.price}/night</p>
        <p className="text-gray-600">{hotel.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onBookNow(hotel)} className="w-full">Book Now</Button>
      </CardFooter>
    </Card>
  );
};
