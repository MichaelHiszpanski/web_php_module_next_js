import React from "react";
interface Props {
  errors: any[];
}
const CustomErros: React.FC<Props> = ({ errors }) => {
  return (
    <div className="w-full h-[50px] mb-5">
      {errors.length > 0 && (
        <div className="text-red-500 text-xl font-mono">
          {errors.map((error: string, index: number) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomErros;
