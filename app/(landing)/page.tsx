import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader, PawPrint } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-between items-center">
      {/* Hidden for small devices */}
      <div className="hidden lg:block">
        <PawPrint color="white" size={200} />
      </div>
      <div className="max-w-[1000px] items-center justify-center  text-white p-10 flex flex-col">
        {/* Hidden for large devices */}
        <div className="block lg:hidden m-10">
          <PawPrint color="white" size={100} />
        </div>
        <h1 className="text-6xl lg:text-8xl mb-5 text-bold tracking-wider text-center">
          WELCOME!
        </h1>
        <p className="text-xl lg:text-2xl mb-7 text-center">
          Start making Daisy the Flower fatter today and log it while doing it
          with statistics!
        </p>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton
              mode="modal"
              forceRedirectUrl="\main"
              signInForceRedirectUrl="\main"
            >
              <Button
                className="min-w-[400px] p-5 text-lg tracking-wider lg:pr-10 lg:pl-10 mb-2"
                variant="primary"
                size="lg"
              >
                Get Started!
              </Button>
            </SignUpButton>
            <SignInButton
              mode="modal"
              forceRedirectUrl="\main"
              signUpForceRedirectUrl="\main"
            >
              <Button
                className="min-w-[400px] p-5 text-lg tracking-wider lg:pr-10 lg:pl-10 text-white hover:text-orange-500"
                variant="ghost"
                size="lg"
              >
                I already feed the Dais...
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button size="lg" variant="primary" asChild>
              <Link href="\main">Continue feeding daisy...</Link>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>
      {/* Hidden for small devices */}
      <div className="hidden lg:block">
        <PawPrint color="white" size={200} />
      </div>
    </div>
  );
}
