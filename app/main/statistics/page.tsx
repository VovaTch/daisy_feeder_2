import { redirect } from "next/navigation";

/**
 * The StatisticsMain component is responsible for redirecting the user to a specific statistics page.
 * When this component is rendered, it automatically redirects to the URL `/main/statistics/007`.
 *
 * @component
 */
const StatisticsMain = () => {
  redirect(`/main/statistics/007`);
};

export default StatisticsMain;
