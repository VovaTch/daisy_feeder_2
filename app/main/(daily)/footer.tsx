import AddFoodDialog from "@/components/dialogs/add-food";

/**
 * DailyFooter component renders a footer section that is positioned
 * absolutely at the bottom of the page. It contains a centered
 * AddFoodDialog component.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const DailyFooter = () => {
  return (
    <footer className="absolute left-0 bottom-0 items-center justify-center w-full h-18">
      <div className="flex flex-col items-center justify-center w-full">
        <AddFoodDialog />
      </div>
    </footer>
  );
};

export default DailyFooter;
