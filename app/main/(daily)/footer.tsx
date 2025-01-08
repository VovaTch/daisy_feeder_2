import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PawPrint } from "lucide-react";

const DailyFooter = () => {
  return (
    <footer className="absolute left-0 bottom-0 items-center justify-center w-full h-20">
      <div className="flex flex-col items-center justify-center w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="flex text-xl w px-10 lg:w-2/5 w-4/5 m-3 lg:text-2xl h-[60px]"
            >
              <PawPrint size={24} />
              Add
              <PawPrint size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Food!</DialogTitle>
              <DialogDescription>
                Add feeding information of Daisy, praise the Dais!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
}; // TODO: Complete

export default DailyFooter;
