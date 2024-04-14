import { useState, useEffect } from "react"
import api from '../api'
import WeekCalendar from '../components/WeekCalendar'

function Calendar (){

    const deleteEvent = (id) =>{
        api.delete(`/api/events/delete/${id}/`).then((res)=>{
            if (res.status===204) alert('note deleted')
            else alert('failed to delete note')
            getEvents()
        }).catch((err) =>alert(err))
        getEvents()
    }

    const createEvent = (e) =>{
        e.preventDefault()
        api.post('/api/events/', {text,start,end}).then((res) => {
            if(res.status === 201) alert('event created')
            else alert('failed to create event')
        }).catch((err)=> alert(err))
    }

    return<div><WeekCalendar/></div>
}

export default Calendar