import { generateInterviewReport, getInterviewReportById, getAllInterviewReport } from "../services/interview.api.js"
import { useCallback, useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context.jsx"
import {useParams} from "react-router"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const {interviewId} = useParams()

    if (!context) {
        throw new Error("use interview must be used within an interview provider")
    }

    const { loading, setloading, report, setReport, reportError, setReportError, reports, setReports } = context

    const generateReport = async ({ jobDescription, resumeFile, selfDescription }) => {
        setloading(true)
        try {
            const res = await generateInterviewReport({ jobDescription, resumeFile, selfDescription });
            const createdReport = res.interviewReport || res
            setReport(createdReport)
            setReportError(null)
            return createdReport
        } catch (err) {
            console.log(err)
            return null
        } finally {
            setloading(false)
        }
    }

    const getReportById = useCallback(async (interviewId) => {
        if (!interviewId) {
            setReport(null)
            return null
        }

        setReport(null)
        setReportError(null)
        setloading(true)
        try {
            const res = await getInterviewReportById(interviewId)
            const detail = res.interviewReport || res
            setReport(detail)
            setReportError(null)
            return detail
        } catch (err) {
            setReportError({
                status: err.response?.status,
                message: err.response?.data?.message || "Unable to load this report."
            })
            console.log(err)
            return null
        } finally {
            setloading(false)
        }
    }, [setReport, setReportError, setloading])

    const getAllReports = useCallback(async () => {
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
    }, [setReports, setloading])

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId, getReportById])


    return { loading, report, reportError, reports, generateReport, getReportById, getAllReports }
}