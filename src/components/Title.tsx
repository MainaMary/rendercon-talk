import { TitleProps } from "../model/types";
const Title = ({ children }: TitleProps) => {
  return (
    <p className="text-4xl text-[#200E32] text-center font-semibold">
      {children}
    </p>
  );
};

export default Title;
