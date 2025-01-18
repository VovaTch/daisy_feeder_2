import SettingsHeader from "./header";

type Props = {
  children: React.ReactNode;
};

export const SettingsLayout = ({ children }: Props) => {
  return (
    <div>
      <SettingsHeader />
      {children}
    </div>
  );
};

export default SettingsLayout;
