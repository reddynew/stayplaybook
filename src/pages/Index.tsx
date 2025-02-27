
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:pl-24">
        {/* Top Banner Ad */}
        <div className="w-full h-[90px] bg-gray-100 rounded-lg mb-8 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Advertisement Banner (728x90)
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
      </main>
    </div>
  );
};

export default Index;
