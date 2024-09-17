import React, { useState } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { COLORS } from '../constants'

const CategoryList = () => {
    const [selectedKeywords, setSelectedKeywords] = useState([])

    // Sample keywords
    const keywords = [
        { id: '1', text: 'Lechuga' },
        { id: '2', text: 'Tomates' },
        { id: '3', text: 'Papas' },
        { id: '4', text: 'Piña' },
        { id: '5', text: 'Uvas' },
        { id: '6', text: 'Naranjas' },
        // Add more keywords as needed
    ]

    const toggleKeyword = (id) => {
        // Check if the keyword is already selected
        const isSelected = selectedKeywords.includes(id)

        if (isSelected) {
            // Deselect the keyword
            setSelectedKeywords(selectedKeywords.filter((item) => item !== id))
        } else {
            // Select the keyword
            setSelectedKeywords([...selectedKeywords, id])
        }
    }

    const renderItem = ({ item }) => {
        // Check if the keyword is selected
        const isSelected = selectedKeywords.includes(item.id)

        return (
            <TouchableOpacity
                onPress={() => toggleKeyword(item.id)}
                style={[
                    styles.keywordItem,
                    {
                        backgroundColor: isSelected
                            ? COLORS.black
                            : COLORS.secondaryWhite,
                    },
                ]}
            >
                <Text
                    style={{ color: isSelected ? COLORS.white : COLORS.black }}
                >
                    {item.text}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={keywords}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    keywordItem: {
        paddingHorizontal: 12,
        margin: 4,
        borderRadius: 8,
        height: 46,
        backgroundColor: COLORS.secondaryWhite,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
})

export default CategoryList
