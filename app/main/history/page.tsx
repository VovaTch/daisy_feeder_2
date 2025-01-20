import { redirect } from "next/navigation";

/**
 * Component that redirects to the history page for the current date.
 *
 * This component uses the `redirect` function to navigate to a URL
 * that includes the current date in ISO format (YYYY-MM-DD).
 *
 * @returns {void}
 */
const HistoryMain = () => {
  redirect(`/main/history/${new Date().toISOString().slice(0, 10)}`);
};

export default HistoryMain;
