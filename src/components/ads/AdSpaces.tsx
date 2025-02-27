
interface AdSpacesProps {
  children: React.ReactNode;
}

export const AdSpaces = ({ children }: AdSpacesProps) => {
  return (
    <>
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
          {children}
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
    </>
  );
};
