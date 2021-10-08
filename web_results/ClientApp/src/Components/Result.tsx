import React from "react";


class Result extends React.Component{
    userId: number = 0;
    registered: Date = new Date();
    lastActivity: Date = new Date();
    id?: number = undefined;

    public getDays() {
        let date1 = new Date(this.registered)
        let date2 = new Date(this.lastActivity)
        let diff = Math.abs(date1.getTime() - date2.getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
    }
}

export default Result