import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const DailyFooter = () => {
  return (
    <footer className="absolute left-0 bottom-0 items-center justify-center w-full bg-green-500/50 h-20">
      <div className="flex flex-1 items-center justify-center w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary" size="lg" className="text-xl w px-10">
              Add
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </footer>
  );
};

export default DailyFooter;
