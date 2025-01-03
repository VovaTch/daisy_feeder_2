import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">Primary Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryOutline">Secondary Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
};

export default ButtonsPage;
