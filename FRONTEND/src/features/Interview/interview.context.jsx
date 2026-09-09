import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [report, setReport] = useState(null);
    const [reportError, setReportError] = useState(null);
    const [reports, setReports] = useState([]);

    return (
        <InterviewContext.Provider value={{ loading, setloading, report, setReport, reportError, setReportError, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}