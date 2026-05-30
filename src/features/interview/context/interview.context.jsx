import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [report, setReport] = useState(null)
  const [reportList, setReportList] = useState([]);

  return (
    <InterviewContext.Provider value={{ loader, setLoader, report, setReport, reportList, setReportList }}>
      {children}
    </InterviewContext.Provider>
  )
}