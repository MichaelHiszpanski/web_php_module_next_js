import CustomInput from "@/src/components/custom-input/CustomInput";
import MessageInput from "@/src/components/message-input/MesageInput";
import userStore from "@/src/mobX/user-store/user_store";
import { getUsersListsFromGroup } from "@/src/services/routes/groupRoutes";
import {
  getMessagesListFromGroup,
  responsePostMessageToGroup,
} from "@/src/services/routes/messageRoute";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
interface Props {
  groupId: number;
}
const MessagesContentTab: React.FC<Props> = ({ groupId }) => {
  const [usersInGroup, setMessagesFromGroup] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    getMessagesListFromGroup(groupId, setMessagesFromGroup);
  }, [groupId]);
  const handleInputChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };
  const sendMessage = async () => {
    await responsePostMessageToGroup(groupId, userStore.user.userId, message);
  };
  return (
    <div className="w-full flex flex-col min-h-[700px] bg-colorFour items-center mb-[100px]">
      <h1>Messages</h1>
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-gray-400 flex flex-col items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Students List"
        style={{ overflowY: "auto" }}
      >
        <div className="w-full h-full" style={{ overflowY: "auto" }}>
          {usersInGroup.map((item: any) => (
            <div
              key={item}
              className="w-full bg-white p-2 rounded-md shadow-sm border border-gray-200"
            >
              Messsage: {item}
            </div>
          ))}
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
