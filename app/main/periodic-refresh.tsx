"use client";

import { usePeriodicRefresh } from "@/hooks/use-periodic-refresh";

type Props = {
  minutes: number;
};

/**
 * A React component that triggers a periodic refresh based on the provided interval in minutes.
 *
 * @param {Props} props - The properties object.
 * @param {number} props.minutes - The interval in minutes for the periodic refresh.
 * @returns {JSX.Element} An empty React fragment.
 */
const Refresher = ({ minutes }: Props) => {
  usePeriodicRefresh(minutes);
  return <></>;
};

export default Refresher;
