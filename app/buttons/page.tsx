import { Button } from "@/components/ui/button";

/**
 * ButtonsPage component renders a page with various button variants for testing purposes.
 *
 * @returns {JSX.Element} A div containing multiple Button components with different variants.
 *
 * @component
 * @example
 * return (
 *   <ButtonsPage />
 * )
 */
const ButtonsPage = () => {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-screen bg-orange-300">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">Primary Outline</Button>
      <Button variant="dry">10</Button>
      <Button variant="wet">25</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">Sidebar Outline</Button>
    </div>
  );
};

export default ButtonsPage;
