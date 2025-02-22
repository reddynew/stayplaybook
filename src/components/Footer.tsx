
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with <Heart className="inline-block h-4 w-4 text-red-500" /> by{" "}
            <a
              href="#"
              className="font-medium underline underline-offset-4"
            >
              StayPlay
            </a>
            . All rights reserved © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
