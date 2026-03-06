import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, Alert, TextInput, TouchableOpacity, View } from "react-native";

export default function TodoInput(){
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
        if(!loading && newTodo.trim()){
            try {
                setLoading(true);
                await addTodo({ text : newTodo.trim() });
                setNewTodo("");
            } catch (error) {
                Alert.alert("Error", "Failed to add todo");
            }finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput 
                    style={homeStyles.input}
                    placeholder="What needs to be done ?"
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={handleAddTodo}
                    multiline
                    placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity 
                    onPress={handleAddTodo}
                    activeOpacity={0.8}
                    disabled={!newTodo.trim()}
                >

                    <LinearGradient
                        colors={newTodo.trim() && !loading ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
                    >
                        {loading ? (
                            <ActivityIndicator size="large" color={colors.textMuted} />
                        ) : (
                            <Ionicons name="add" size={24} color="#eee" />
                        )}
                    </LinearGradient> 
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}