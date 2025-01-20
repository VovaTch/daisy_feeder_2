import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

/**
 * Header component that renders the header section of the application.
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @remarks
 * The header includes:
 * - A logo image and title.
 * - A loading spinner while authentication state is being determined.
 * - A user button if the user is signed in.
 * - A login button if the user is signed out.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-orange-100 px-4 bg-orange-500/50">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/images/daisy-hexagon.png"
            alt="Daisy Feeder 2"
            width={50}
            height={50}
          />
          <h1 className="text-white lg:text-2xl tracking-wide">
            Daisy Feeder 2
          </h1>
        </div>
        <div></div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="\main"
              signUpForceRedirectUrl="\main"
            >
              <Button size="lg" variant="default">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
