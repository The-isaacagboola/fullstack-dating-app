import { ReactNode } from "react";
type PageProps = {
  header: ReactNode | string;
  children: ReactNode;
  footer?: ReactNode;
};
const CardInnerWrapper = ({ header, children, footer }: PageProps) => {
  return (
    <div className="w-full">
      <div className="w-full mt-3 pb-2 mb-4 border-b-2 border-gray-400/20">
        {typeof header === "string" ? (
          <h1 className="text-2xl font-medium">{header}</h1>
        ) : (
          <>{header}</>
        )}
      </div>

      <div>{children}</div>

      {footer && <div>{footer}</div>}
    </div>
  );
};

export default CardInnerWrapper;
