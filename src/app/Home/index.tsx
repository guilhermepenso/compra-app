import "~/global.css";

import { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, FlatList, Alert } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "~/src/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {

  const [items, setItems] = useState<any>([]);
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");

  function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
  }

  useEffect(() => {}, [])

  return (
    <View className="flex-1 items-center bg-[#d0d2d8] pt-[62]">
      <Image className="h-[34] w-[134]" source={require("@/assets/logo.png")} />

      <View className="w-full px-[16] gap-[7] mt-[42]">
        <Input 
          placeholder="O que você precisa comprar?" 
          onChangeText={setDescription}
        />
        <Button 
          title="Adicionar" 
          onPress={handleAdd}
        />
      </View>

      <View className="flex-1 w-full bg-white rounded-t-[24] p-[24] pt-[32] mt-[24]">
        <View className="w-full flex-row gap-[12] border-b border-b-[#E4E6EC] pb-[12]">
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status} 
              status={status} 
              isActive={status === filter} 
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity className="ml-auto">
            <Text className="text-[12px] font-semibold text-[#828282]">
              Limpar
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("mudar o status")}
              onRemove={() => console.log("remover")}
            />  
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-full h-[1] bg-[#EEF0F5] my-[16px]" />}
          contentContainerStyle={{
            paddingTop: 24,
            paddingBottom: 62
          }}
          ListEmptyComponent={() => <Text className="text-sm text-[#808080] text-center">Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  );
}
