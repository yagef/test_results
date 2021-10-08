import dateFormat from "dateformat";
import React from "react";
import Result from "./Result";

// @ts-ignore
const ReadOnly = ({ res }) => {
    return (
        <tr>
            <td/>
            <td>{res.userId}</td>
            <td>{dateFormat(res.registered, "[dd.mm.yyyy]")}</td>
            <td>{dateFormat(res.lastActivity, "[dd.mm.yyyy]")}</td>
        </tr>
    )
}

export default ReadOnly;