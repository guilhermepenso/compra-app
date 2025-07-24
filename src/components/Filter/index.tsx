import { FilterStatus } from "@/types/FilterStatus";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { StatusIcon } from "@/components/StatusIcon";

type Props = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity
      className={` flex-row items-center gap-[5] ${isActive ? "opacity-100" : "opacity-50"}`}
      activeOpacity={0.8}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text className="text-sm font-semibold">
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
