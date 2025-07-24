import { TextInput, TextInputProps } from "react-native";

export function Input({...rest}: TextInputProps){
    return (
        <TextInput
            className="bg-white px-[16] h-[48] w-[100%] rounded-[8] border border-[#C3C5CB]"
            placeholderTextColor={"#74798B"}
            {...rest}
        />
    );
}