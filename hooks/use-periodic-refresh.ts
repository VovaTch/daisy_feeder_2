import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Custom hook that sets up a periodic refresh of the current route.
 *
 * @param {number} [intervalMinutes=10] - The interval in minutes at which the page should be refreshed. Defaults to 10 minutes.
 *
 * @returns {void}
 *
 * @example
 * // Refresh the page every 5 minutes
 * usePeriodicRefresh(5);
 *
 * @remarks
 * This hook uses `setInterval` to periodically refresh the current route using the `router.refresh()` method.
 * The interval is cleared when the component using this hook unmounts.
 */
export function usePeriodicRefresh(intervalMinutes = 10) {
  const router = useRouter();

  useEffect(() => {
    // Convert minutes to milliseconds
    const intervalMs = intervalMinutes * 60 * 1000;

    // Set up the interval to refresh the page
    const intervalId = setInterval(() => {
      // Perform a soft refresh of the current route
      router.refresh();
    }, intervalMs);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [intervalMinutes, router]);
}
