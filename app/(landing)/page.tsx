import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

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
        <Button
          className="min-w-[400px] p-5 text-lg tracking-wider lg:pr-10 lg:pl-10"
          variant="primary"
          size="lg"
        >
          Get Started!
        </Button>
      </div>
      {/* Hidden for small devices */}
      <div className="hidden lg:block">
        <PawPrint color="white" size={200} />
      </div>
    </div>
  );
}
