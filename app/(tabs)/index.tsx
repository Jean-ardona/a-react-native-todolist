import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const { toggleDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Hello world, This is my first app in React native</Text>

      <TouchableOpacity onPress={toggleDarkMode} style={styles.button}> 
        <Text style={{color : "white", fontWeight : "bold"}}>Press Me</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    paddingInline : 20,
  },
  content : {
    margin: 20,
    fontSize: 30
  },
  button : {
    backgroundColor : "blue", paddingInline : 20, paddingBlock : 10, borderRadius : 10
  }
})
