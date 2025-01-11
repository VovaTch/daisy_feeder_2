import { redirect } from "next/navigation";

const HistoryMain = () => {
  redirect(`/main/history/${new Date().toISOString().slice(0, 10)}`);
};

export default HistoryMain;
