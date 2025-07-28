import "~/global.css";

import { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, FlatList, Alert } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "~/src/components/Item";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {

  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    };

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.add(newItem);
    await itemsByStatus();
    Alert.alert("Adicionado", `Adicionado ${description}`);
    setDescription("");
    setFilter(FilterStatus.PENDING);
  }

  async function itemsByStatus(){
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover todos os itens.");
    }
  }

  function handleClear(){
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear()}
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível limpar os itens.");
    }
  }

  async function handleToggleItemStatus(id: string){
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <View className="flex-1 items-center bg-[#d0d2d8] pt-[62]">
      <Image className="h-[34] w-[134]" source={require("@/assets/logo.png")} />

      <View className="w-full px-[16] gap-[7] mt-[42]">
        <Input 
          placeholder="O que você precisa comprar?" 
          onChangeText={setDescription}
          value={description}
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
          <TouchableOpacity 
            className="ml-auto"
            onPress={handleClear}
          >
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
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
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
