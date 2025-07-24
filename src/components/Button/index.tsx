import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="h-[48] w-full rounded-[8] items-center justify-center bg-[#2C46B1]"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="text-white text-base font-[600]">{title}</Text>
    </TouchableOpacity>
  );
};
