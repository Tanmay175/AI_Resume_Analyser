import { generateInterviewReport, getInterviewReportById, getAllInterviewReport } from "../services/interview.api.js"
import { useContext } from "react"
import { InterviewContext } from "../interview.context.jsx"

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("use interview must be used within an interview provider")
    }

    const { loading, setloading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, resumeFile, selfDescription }) => {
        setloading(true)
        try {
            const res = await generateInterviewReport({ jobDescription, resumeFile, selfDescription });
            const createdReport = res.interviewReport || res
            setReport(createdReport)
            return createdReport
        } catch (err) {
            console.log(err)
            return null
        } finally {
            setloading(false)
        }
    }

    async function getReportById(interviewId) {
        setloading(true)
        try {
            const res = await getInterviewReportById(interviewId)
            const detail = res.interviewReport || res
            setReport(detail)
            return detail
        } catch (err) {
            console.log(err)
            return null
        } finally {
            setloading(false)
        }
    }

    async function getAllReports() {
        setloading(true)
        try {
            const res = await getAllInterviewReport()
            const list = res.interviewReports || []
            setReports(list)
            return list
        } catch (err) {
            console.log(err)
            return []
        } finally {
            setloading(false)
        }
    }

    return { loading, report, reports, generateReport, getReportById, getAllReports }
}