import { useEffect, useState } from "react";
import HistoryElement from "../components/HistoryElement";
import { getHistory } from "../service/QuizeApiCall";
import Loader from "../components/Loader";
import { useUserContext } from "../context/UserContext";

function History() {
  const [isLoading, setIsLoading] = useState(true);
  const { history, setHistory } = useUserContext();
  useEffect(function () {
    setIsLoading(true);
    async function getHistoryData() {
      const data = await getHistory();
      setHistory(data);
    }
    getHistoryData();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <Loader>Loading History...</Loader>;
  }

  return (
    <div>
      {history.map((h) => (
        <HistoryElement history={h} key={h.id} />
      ))}
    </div>
  );
}

export default History;
