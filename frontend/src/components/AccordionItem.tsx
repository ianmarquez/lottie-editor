import { PropsWithChildren } from "react";
import { FiTrash2 } from "react-icons/fi";
import cn from "../utils/twMerge";

type AccordionItemProps = PropsWithChildren<{
  open: boolean;
  header: string;
  index: number;
  canDelete?: boolean;
  onClick: (index: number, nextState: boolean) => void;
  onDelete?: (index: number) => void;
}>;

export default function AccordionItem(props: AccordionItemProps) {
  return (
    <div
      tabIndex={0}
      className={cn(
        "flex-shrink-0 rounded-md flex flex-col",
        props.open ? "bg-base-200" : "bg-base-300",
      )}
    >
      <div
        className="text-xl font-medium flex flex-row justify-between p-4"
        onClick={() => {
          const nextState = !props.open;
          props.onClick(props.index, nextState);
        }}
      >
        <p>{props.header}</p>
      </div>
      {props.open ? (
        <div
          className={cn(
            "p-4 flex flex-col overflow-scroll  gap-2 flex-grow duration-300",
          )}
        >
          {props.children}
          {!!props.canDelete && !!props.onDelete && (
            <button
              className="btn btn-error text-white"
              onClick={() => props.onDelete?.(props.index)}
            >
              Delete <FiTrash2 size={24} />
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
