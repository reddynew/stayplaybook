
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
import { useHotels } from "@/contexts/HotelContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const { bookings } = useHotels();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: "+1 234 567 8900"
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Hey, {userData.name}! 👋</h1>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>

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

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <div className="p-4">
                    <h3 className="font-semibold">{booking.hotelName}</h3>
                    <div className="space-y-2 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {booking.checkIn.toLocaleDateString()} to{" "}
                          {booking.checkOut.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {booking.guests} guests
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
