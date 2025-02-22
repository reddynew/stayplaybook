
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your Next Adventure Awaits
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover and book amazing hotels and thrilling amusement parks all in
            one place. Start your journey today.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/hotels")}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
            >
              Find Hotels
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/parks")}
              className="border-2"
            >
              Explore Parks
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
