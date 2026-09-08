import axios from "axios"

const api= axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

export async function generateInterviewReport({resumeFile,jobDescription,selfDescription}) {
    const formData= new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    const response= await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data;

}

export async function getInterviewReportById(interviewId){
    const res = await api.get(`/api/interview/report/${interviewId}`)
    return res.data;
}

export async function getAllInterviewReport(){
    const res = await api.get("/api/interview")
    return res.data;
}