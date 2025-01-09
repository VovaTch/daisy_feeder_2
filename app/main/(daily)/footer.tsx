import AddFoodDialog from "@/components/dialogs/add-food";

const DailyFooter = () => {
  return (
    <footer className="absolute left-0 bottom-0 items-center justify-center w-full h-20">
      <div className="flex flex-col items-center justify-center w-full">
        <AddFoodDialog />
      </div>
    </footer>
  );
};

export default DailyFooter;
