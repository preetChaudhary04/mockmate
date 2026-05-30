import { useContext, useEffect } from "react";
import { InterviewContext } from "./interview.context";
import { useParams } from "react-router"
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interview.api";

export const useInterview = () => {

  const { interviewId } = useParams()

  const context = useContext(InterviewContext);
  if (!context)
    throw new Error("useInterview must be used within an InterviewProvider");

  const { loader, setLoader, report, setReport, reportList, setReportList } = context;

  const handleGenerateReport = async ({ resume, selfDescription, jobDescription }) => {
    setLoader(true);
    let data = null;
    try {
      data = await generateInterviewReport({ resume, selfDescription, jobDescription });
      setReport(data.interviewReport);
      return data.interviewReport;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleGetInterviewById = async (interviewId) => {
    setLoader(true);
    let data = null;
    try {
      data = await getInterviewReportById(interviewId);
      setReport(data.report);
      return data.report;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleGetAllReports = async (interviewId) => {
    setLoader(true);
    let data = null;
    try {
      data = await getAllInterviewReports(interviewId);
      setReportList(data.reports);
      return data.reports;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      handleGetInterviewById(interviewId);
    } else {
      handleGetAllReports();
    }
    handleGetAllReports();
  }, [ interviewId ])

  return {
    loader,
    report,
    reportList,
    handleGenerateReport,
    handleGetInterviewById,
    handleGetAllReports,
  };
};
