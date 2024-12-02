import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import React from "react";
interface Props {
  messageid: any;
  messagecontext: string;
  username: string;
  datecreated: string;
}

const MessageDisplay: React.FC<Props> = ({
  messageid,
  messagecontext,
  username,
  datecreated,
}) => {
  return (
    <div
      key={messageid}
      className="w-full bg-white p-2 rounded-md shadow-sm border border-gray-200 my-1"
    >
      {messagecontext}
      <div className="w-full  text-end  font-mono" style={{ fontSize: "12px" }}>
        <strong>Send:</strong> {username} <strong>Date:</strong>{" "}
        {dateTimeFormater(datecreated)}
      </div>
    </div>
  );
};

export default MessageDisplay;
