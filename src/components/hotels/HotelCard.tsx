
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    price: number;
    description: string;
    image: string;
  };
  onBookNow: (hotel: any) => void;
}

export const HotelCard = ({ hotel, onBookNow }: HotelCardProps) => {
  return (
    <Card className="overflow-hidden">
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
        <Button onClick={() => onBookNow(hotel)}>Book Now</Button>
      </CardFooter>
    </Card>
  );
};
