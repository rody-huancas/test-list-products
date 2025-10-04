import { cn } from "../utils";
import { FaExclamationTriangle, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

interface PropsAlert {
  type   : "error" | "success" | "warning" | "info";
  message: string;
}

const Alert = ({ type, message }: PropsAlert) => {
  const getAlertStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5 flex-shrink-0";

    switch (type) {
      case "error":
        return <FaExclamationCircle className={iconClass} />;
      case "success":
        return <FaCheckCircle className={iconClass} />;
      case "warning":
        return <FaExclamationTriangle className={iconClass} />;
      case "info":
        return <FaInfoCircle className={iconClass} />;
      default:
        return <FaInfoCircle className={iconClass} />;
    }
  };

  return (
    <div
      className={cn(
        "py-4 px-5 w-full rounded-lg border font-medium flex items-center gap-3",
        getAlertStyles()
      )}
    >
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
