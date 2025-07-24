import "~/global.css";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  return (
    <View className="flex-1 items-center bg-[#d0d2d8] pt-[62]">
      <Image className="h-[34] w-[134]" source={require("@/assets/logo.png")} />
      
      <View className="w-full px-[16] gap-[7] mt-[42]">
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View className="flex-1 w-full bg-white rounded-t-[24] p-[24] pt-[32] mt-[24]">
        <View className="w-full flex-row gap-[12] border-b border-b-[#E4E6EC] pb-[12]">
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive/>
          ))}
          <TouchableOpacity className="ml-auto">
            <Text className="text-[12px] font-semibold text-[#828282]">Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
