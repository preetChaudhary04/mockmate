import axios from "axios";

const api = axios.create({
  baseURL: "https://mockmatebackend.onrender.com",
  withCredentials: true,
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  try {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post("/api/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
};
