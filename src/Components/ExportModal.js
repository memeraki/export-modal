import { useState, useEffect } from "react";
import RadioInput from "./RadioInput";
import sendRequest from "../Api/sendRequest";

function ExportModal() {

  const [reportInput, setReportInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("Excel");
  const [selectedSchedule, setSelectedSchedule] = useState("No Repeat");
  const [schedule, setSchedule] = useState({option: "No Repeat"});

  const [date, setDate] = useState("2022-02-22");
  const [time, setTime] = useState("13:00:00");
  const [day, setDay] = useState("Wednesday");

  const [status, setStatus] = useState("");

  useEffect(() => {
    handleSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule, time, date, day]); 

  const handleInputChange = (e) => {
    if (e.target.name === "reportName")
      return setReportInput(e.target.value);
    if (e.target.name === "registerEmail") 
      return setEmailInput(e.target.value);
    if (e.target.name === "date") 
      return setDate(e.target.value);
    if (e.target.name === "time") 
      return setTime(e.target.value);
  };

  const handleSchedule = () => {
    setSchedule({});
    switch (selectedSchedule) {
      case 'No Repeat':
        setSchedule({option:  selectedSchedule});
        break; 
      case 'Specific Date':
        setSchedule({option:  selectedSchedule, date, time });
        break;
      case 'Daily':
        setSchedule({option:  selectedSchedule, time});
        break;
      case 'Weekly':
        setSchedule({option:  selectedSchedule, day, time});
        break;
      default:
        setSchedule({option:  "No Repeat"});
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Request is being sent");
    const data = {reportInput, selectedFormat, emailInput, schedule};
		const json = JSON.stringify(data, null, 4);
		console.clear();
		console.log("Data to send: ", json);
    // POST request
    try {
      const res = await sendRequest(json);
    if (res.error) {
      setStatus("Report did not successful!");
    }
    if (res.message) {
      clearFrom();
      setStatus("Report send successful!");
    }
    } catch (error) {
      setStatus("Error: " + error);
    }
  };

  const handleWeekly = (e) => {
    setDay(e.target.value);
  }

  const clearFrom = () => {
    setReportInput("");
    setEmailInput("");
    setSelectedFormat("Excel");
    setSelectedSchedule("No Repeat");
    setSchedule({option: "No Repeat"});
    setDate("2022-02-22");
    setTime("13:00:00");
    setDay("Wednesday");
    // reset status
    setStatus("");
  }

  const renderSchedule = (param) => {
    switch(param) {
      case 'No Repeat':
        return null;
      case 'Specific Date':
        return (
          <>
          <label>Date</label>
          <div className="schedule">
            <input 
              type="date"
              name="date"
              value={date} 
              onChange={handleInputChange}/>
            <label>at</label>
            <input
              type="time"
              name="time"
              value={time} 
              onChange={handleInputChange}
            />
          </div>
          </>
          );
      case 'Daily':
        return (
          <>
          <label>Everyday at</label>
          <div className="schedule">
            <input 
              type="time" 
              name="time"
              value={time} 
              onChange={handleInputChange}  
            />
          </div>
          </>
          );
      case 'Weekly':
        return (
          <>
          <label>Every</label>
          <div className="schedule">
            <select defaultValue={day} name="Weekly" onChange={handleWeekly}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <label>at</label>
            <input 
              type="time" 
              name="time" 
              value={time}
              onChange={handleInputChange} 
            />
          </div>          
          </>
          );
      default:
        return null;
    }
  }

  return (
    <>
      <div className='modal'>
        <div className='header'>
          Export Report
        </div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='inputs'>
              <label className="labels">Report name</label>
              <input
                type="text"
                name="reportName"
                placeholder="Shareablee Report"
                value={reportInput}
                onChange={handleInputChange}
                required
              />
              <label>Format</label>
              <div>
                <RadioInput label="Excel" value="Excel" checked={selectedFormat} setter={setSelectedFormat}  />
                <RadioInput label="CSV" value="CSV" checked={selectedFormat} setter={setSelectedFormat} />
              </div>
              <label>E-mail to</label>
              <input
                type="email"
                name="registerEmail"
                placeholder="client@company.com"
                value={emailInput}
                onChange={handleInputChange}
                required
              />
              <label>Schedule</label>
              <div>
                <RadioInput label="No Repeat" value="No Repeat" checked={selectedSchedule} setter={setSelectedSchedule} />
                <RadioInput label="Specific Date" value="Specific Date" checked={selectedSchedule} setter={setSelectedSchedule}  />
                <RadioInput label="Daily" value="Daily" checked={selectedSchedule} setter={setSelectedSchedule}  />
                <RadioInput label="Weekly" value="Weekly" checked={selectedSchedule} setter={setSelectedSchedule}  />
              </div>
              {renderSchedule(selectedSchedule)}
            </div>
            <div className='buttons'>
              <div className="status">{!status ? null : status}</div>
              <input className="light" type="button" value="Cancel" onClick={clearFrom} />
              <input className="dark" type="submit" value="OK" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExportModal;
