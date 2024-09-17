import React, { useState } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { COLORS } from '../constants'

const KeywordList = () => {
    const [selectedKeywords, setSelectedKeywords] = useState([])

    // Sample keywords
    const keywords = [
        { id: '1', text: 'Tomates' },
        { id: '2', text: 'Lechuga' },
        { id: '3', text: 'Plátano' },
        { id: '4', text: 'Uva' },
        { id: '5', text: 'Col' },
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
                            ? COLORS.primary
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

export default KeywordList
