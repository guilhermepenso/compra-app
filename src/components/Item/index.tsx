import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type Props = {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
};

export function Item({ data, onStatus, onRemove }: Props) {
  return (
    <View className="flex-row items-center gap-[7]">
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text className="flex-1 text-sm font-semibold">{data.description}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color={"#828282"} />
      </TouchableOpacity>
    </View>
  );
}
