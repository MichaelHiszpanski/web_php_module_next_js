import React, { FC, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

interface Props {
  label: string;
  value: string;
  name: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onSend: () => void;
}

const MessageInput: FC<Props> = ({
  label,
  value,
  name,
  onInputChange: onChange,
  placeholder = "",
  onSend,
  onFocus = () => {},
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className=" flex flex-row">
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={(e) => {
            onFocus(e);
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          rows={3}
          className={`w-full p-2 border rounded resize-none bg-yellow-200 font-mono`}
        />
        <div className="flex flex-col items-center justify-center ml-2 cursor-pointer font-orbitron_variable hover:text-blue-500">
          <FaFacebookMessenger
            size={25}
            color="colorFive"
            className="hover:text-blue-500"
            onClick={onSend}
          />{" "}
          Send
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
