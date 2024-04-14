import { useState, useEffect, useRef } from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from '@daypilot/daypilot-lite-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import api from '../api'

function WeekCalendar(){
    const calendarRef = useRef()

    const [Events, setEvents] = useState([])

    const getEvents = () => {

        api
            .get('/api/events/')
            .then((res) => res.data)
            .then((data) => {
                setEvents(data); 
                console.log(Events)
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
      e.data.text = modal.result;
      dp.events.update(e);
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
        api.post('/api/events/', {text,start,end}).then((res) => {
            if(res.status === 201) alert('event created')
            else alert('failed to create event')
        }).catch((err)=> alert(err))
        getEvents()
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      onEventClick: async args => {
        await editEvent(args.e);
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: async args => {
              const dp = calendarRef.current.control;
              dp.events.remove(args.source);
            },
          },
          {
            text: "-"
          },
          {
            text: "Edit...",
            onClick: async args => {
              await editEvent(args.source);
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
            symbol: "icons/daypilot.svg#minichevron-down-2",
            fontColor: "#fff",
            toolTip: "Show context menu",
            action: "ContextMenu",
          },
          {
            top: 3,
            right: 25,
            width: 20,
            height: 20,
            symbol: "icons/daypilot.svg#x-circle",
            fontColor: "#fff",
            action: "None",
            toolTip: "Delete event",
            onClick: async args => {
              const dp = calendarRef.current.control;
              dp.events.remove(args.source);
            }
          }
        ];
  
  
        const participants = args.data.participants;
        if (participants > 0) {
          // show one icon for each participant
          for (let i = 0; i < participants; i++) {
            args.data.areas.push({
              bottom: 5,
              right: 5 + i * 30,
              width: 24,
              height: 24,
              action: "None",
              image: `https://picsum.photos/24/24?random=${i}`,
              style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
            });
          }
        }
      }
    });
  
    useEffect(() => {
        getEvents()
    }, []);
  
    return (
        <Container>
            <Row>
                <Col>
                <DayPilotNavigator
                    selectMode={"Week"}
                    showMonths={3}
                    skipMonths={3}
                    startDate={"2023-10-02"}
                    selectionDay={"2023-10-02"}
                    onTimeRangeSelected={ args => {
                    calendarRef.current.control.update({
                        startDate: args.day
                    });
                    }}
                />
                </Col>
                <Col>
                <DayPilotCalendar
                    {...calendarConfig}
                    ref={calendarRef}
                />
                </Col>
            </Row>
        </Container>

    );
}

export default WeekCalendar