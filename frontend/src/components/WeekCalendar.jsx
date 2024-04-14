import { useState, useEffect, useRef } from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from '@daypilot/daypilot-lite-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import api from '../api'
import '../styles/WeekCalendar.css'

function WeekCalendar(){
    const calendarRef = useRef()

    const [Events, setEvents] = useState([])

    const getEvents = () => {

        api
            .get('/api/events/')
            .then((res) => res.data)
            .then((data) => {
                setEvents(data); 
                console.log(data)
                const events = data
            
                const startDate = "2024-04-14";
            
                calendarRef.current.control.update({startDate, events});
            
            })
            .catch((err)=>{console.log(err)})
    }

    const editEvent = async (e) => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
      if (!modal.result) { return; }
      const id = e.id()
      const text = modal.result
      const start = e.data.start
      const end = e.data.end
      const res = await api.put(`/api/events/${id}/`,{text,start,end})
      if (res.status!=201)return;
      e.data.text = modal.result;
      await dp.events.update(e);
    };
  
    const [calendarConfig, setCalendarConfig] = useState({
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = calendarRef.current.control;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        const text = modal.result
        const start = args.start
        const end = args.end
        const res = await api.post('/api/events/', {text,start,end})
        if(res.status!=201) return;
        getEvents()
        dp.events.add({
          start: args.start,
          end: args.end,
          id: res.data.id,
          text: modal.result
        });
      },
      onEventClick: async args => {
        await editEvent(args.e);
      },
      onEventResized: async args =>{
        const id = args.e.id()
        const text = args.e.text()
        const start = args.newStart
        const end = args.newEnd
        const res = await api.put(`/api/events/${id}/`,{text,start,end})
      },
      onEventMoved: async args =>{
        const id = args.e.id()
        const text = args.e.text()
        const start = args.newStart
        const end = args.newEnd
        const res = await api.put(`/api/events/${id}/`,{text,start,end})
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: async args => {
              const dp = calendarRef.current.control;
              const id = args.source.id()
              const res = await api.delete(`/api/events/delete/${id}/`)
              if(res.status!=204) return;
              dp.events.remove(args.source);
            },
          },
          {
            text: "-"
          },
          {
            text: "Edit...",
            onClick: async args => {
                editEvent(args.source);
            }
          }
        ]
      }),
      onBeforeEventRender: args => {
        args.data.areas = [
          {
            top: 3,
            right: 3,
            width: 20,
            height: 20,
            fontColor: "#fff",
            toolTip: "Show context menu",
            action: "ContextMenu",
          },
          {
            top: 3,
            right: 25,
            width: 20,
            height: 20,
            fontColor: "#fff",
            action: "None",
            toolTip: "Delete event",
            onClick: async args => {
              const dp = calendarRef.current.control;
              dp.events.remove(args.source);
            }
          }
        ];
      }
    });
  
    useEffect(() => {
        getEvents()
    }, []);
  
    return (
      <Row id="main-row">
          <Col className="tall-column" xs={2}>
              <DayPilotNavigator
                  selectMode={"Week"}
                  showMonths={3}
                  skipMonths={3}
                  onTimeRangeSelected={ args => {
                  calendarRef.current.control.update({
                      startDate: args.day
                  });
                  }}
              />
            </Col>
            <Col className="tall_column" xs={10}>
              <DayPilotCalendar
                  {...calendarConfig}
                  ref={calendarRef}
              />
          </Col>
      </Row>
    );
}

export default WeekCalendar