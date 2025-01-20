import SettingsHeader from "./header";

type Props = {
  children: React.ReactNode;
};

/**
 * SettingsLayout component that provides a layout for the settings page.
 * It includes a SettingsHeader component and renders any children passed to it.
 *
 * @param {Props} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered SettingsLayout component.
 */
export const SettingsLayout = ({ children }: Props) => {
  return (
    <div>
      <SettingsHeader />
      {children}
    </div>
  );
};

export default SettingsLayout;
