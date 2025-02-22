
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, MapPin, Calendar } from "lucide-react";

// Mock user data (replace with Supabase data later)
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
  phone: "+1 234 567 8900"
};

// Mock bookings data (replace with Supabase data later)
const mockBookings = [
  {
    id: 1,
    type: "hotel",
    name: "Luxury Resort & Spa",
    location: "Miami Beach, FL",
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    type: "park",
    name: "Magic Kingdom",
    location: "Orlando, FL",
    date: "2024-04-01",
    image: "https://images.unsplash.com/photo-1620058695696-c11b12829ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);

  const handleSaveProfile = () => {
    // TODO: Implement save logic with Supabase
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Hey, {userData.name}! 👋</h1>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-2">
                  <div>
                    <Label>Name</Label>
                    <p className="text-gray-600">{userData.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-gray-600">{userData.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-gray-600">{userData.phone}</p>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Bookings Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id}>
                  <div className="flex">
                    <img
                      src={booking.image}
                      alt={booking.name}
                      className="w-32 h-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{booking.name}</h3>
                      <div className="space-y-2 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {booking.type === "hotel" ? (
                            <span>
                              {booking.checkIn} to {booking.checkOut}
                            </span>
                          ) : (
                            <span>{booking.date}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
