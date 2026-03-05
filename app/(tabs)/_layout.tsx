import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";


export default function TabsLayout(){
    const { colors } = useTheme();
    
    return ( 
        <Tabs screenOptions={{
            headerShown : false,
            tabBarActiveTintColor : colors.primary,
            tabBarInactiveTintColor : colors.textMuted,
            tabBarStyle:{
                backgroundColor : colors.surface,
                borderTopColor : colors.border,
                height: 60
            },
            tabBarLabelStyle:{
                fontSize : 14 ,
                fontWeight : "600"
            }
        }}>
            <Tabs.Screen 
                name="index"
                options={{
                    title : "Todos",
                    tabBarIcon : ({color, size}) => (
                        <Ionicons name='flash-outline' size={size} color={color}/>
                     )
                }}
            />
            <Tabs.Screen 
                name="settings"
                options={{
                    title : "Settings",
                    tabBarIcon : ({color, size}) => (
                        <Ionicons name='settings' size={size} color={color}/>
                     )
                }}
            />
        </Tabs>
    )
}