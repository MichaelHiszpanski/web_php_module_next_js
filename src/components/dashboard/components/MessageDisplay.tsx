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
      className="w-full bg-white p-2 rounded-md shadow-sm border border-colorFour my-1"
    >
      {messagecontext}
      <div
        className="w-full flex flex-row justify-end items-end  font-mono border-t border-colorFour "
        style={{ fontSize: "12px" }}
      >
        <div className="w-min flex mt-1 flex-row  border-[0.5px] border-colorSrcTwo px-2 py-1 rounded-xl whitespace-nowrap overflow-hidden text-ellipsis">
          <strong>Send:</strong> {username}{" "}
          <strong className="ml-2"> Date:</strong>{" "}
          {dateTimeFormater(datecreated)}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
