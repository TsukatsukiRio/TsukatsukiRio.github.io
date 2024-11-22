import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SidebarMenuItem = ({ title }) => {
    const [isHovered, setIsHovered] = useState(false); // 初始状态为未悬停

    const handlePressIn = () => {
        setIsHovered(true); // 触摸按下（类似鼠标悬停开始）时，设置为悬停状态
    };

    const handlePressOut = () => {
        setIsHovered(false); // 触摸松开（类似鼠标悬停结束）时，恢复非悬停状态
    };

    return (
        <View
            style={[styles.menuItem, isHovered? styles.hoveredMenuItem : null]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    hoveredMenuItem: {
        backgroundColor: '#f00', // 悬停时的背景色为红色
    },
});

export default SidebarMenuItem;