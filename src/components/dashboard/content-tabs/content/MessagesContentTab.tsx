import MessageInput from "@/src/components/message-input/MesageInput";
import userStore from "@/src/mobX/user-store/user_store";
import {
  getMessagesListFromGroup,
  responsePostMessageToGroup,
} from "@/src/services/routes/messageRoute";
import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import MessageDisplay from "../../components/MessageDisplay";

interface Props {
  groupId: number;
}

const MessagesContentTab: React.FC<Props> = ({ groupId }) => {
  const [messagesInGroup, setMessagesFromGroup] = useState<any>([]);
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    await responsePostMessageToGroup(
      groupId,
      userStore.user.userId,
      userStore.user.name,
      message
    );

    setMessage("");
    await getGroupMessages();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const getGroupMessages = useCallback(async () => {
    await getMessagesListFromGroup(groupId, setMessagesFromGroup);
  }, [groupId]);

  useEffect(() => {
    getGroupMessages();
  }, [getGroupMessages]);

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  return (
    <div className="w-full flex flex-col min-h-[700px] items-center mb-[100px]">
      <h1 className="text-2xl font-orbitron_variable font-bold">Messanger</h1>
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-white flex flex-col items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Students List"
        style={{ overflowY: "auto" }}
      >
        <div
          className="w-full h-full flex flex-col-reverse items-start overflow-y-auto"
          style={{ overflowY: "auto" }}
        >
          {messagesInGroup?.length > 0 ? (
            messagesInGroup.map((item: any) => (
              <MessageDisplay
                key={item.messageid}
                messageid={item.messageid}
                messagecontext={item.messagecontext}
                username={item.username}
                datecreated={dateTimeFormater(item.datecreated)}
              />
            ))
          ) : (
            <div>No messages found.</div>
          )}
        </div>
        <MessageInput
          label={"Message"}
          value={message}
          name={"message"}
          onInputChange={handleInputChange}
          onSend={() => sendMessage()}
        />
      </div>
    </div>
  );
};

export default observer(MessagesContentTab);
