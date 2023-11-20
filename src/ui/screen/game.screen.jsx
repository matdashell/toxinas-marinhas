import data_json from '../../data/data.json'
import { useCallback, useEffect, useState } from 'react'
import { CardComponent } from '../component/card.component'
import { INTERFACE_CARD } from '../../interface/card'
import './game.style.css'

const LOAD_TIME = 1000

const TYPE_ENUM = {
    ANIMAL: 'ANIMAL',
    TOXINA: 'TOXINA',
    NULL: 'NULL'
}

const DEF_DATA = {
    cards: [] = [{...INTERFACE_CARD}],
    unlocked: true,
    totalCards: 0,
    totalFindeds: 0
}

export const GameScreen = () => {

    const [data, setData] = useState({...DEF_DATA})

    const resetData = useCallback(() => {
        const shuffledCards = [...data_json].sort(() => Math.random() - 0.5)
        const shuffledClickedCard = shuffledCards.map(card => ({...card, clicked: true}))
        const totalCards = shuffledCards.length

        setData({...DEF_DATA, unlocked: false, totalCards: totalCards, cards: shuffledCards})
        setTimeout(() => {
            setData(prev => ({...prev, cards: shuffledClickedCard}))
        }, LOAD_TIME)
        setTimeout(() => {
            setData(prev => ({...prev, unlocked: true, cards: shuffledCards}))
        }, LOAD_TIME * 3)
    }, [])

    const handleOnCLickCard = (selectedCard) => {

        if (data.unlocked) {
            const lastSelectedCard = data.cards.find(card => card.clicked)

            const newCards = data.cards.map(card => {
                if (card.id === selectedCard.id) {
                    return { ...card, clicked: true }
                }
                return card
            })

            setData(prev => ({...prev, cards: newCards}))

            if (lastSelectedCard) {
                const animalCard = lastSelectedCard.type === TYPE_ENUM.ANIMAL ? lastSelectedCard : selectedCard
                const toxinCard = animalCard.id === lastSelectedCard.id ? selectedCard : lastSelectedCard
                const findedPairOfCard = animalCard?.toxin === toxinCard.id

                const newCards = data.cards.map(card => {
                    if (card.id === animalCard.id || card.id === toxinCard.id) {
                        return { ...card, clicked: false, finded: findedPairOfCard }
                    }
                    return card
                })

                if (findedPairOfCard) {
                    const findeds = data.totalFindeds + 2
                    setData(prev => ({...prev, cards: newCards, totalFindeds: findeds}))
                    setTimeout(() => {
                        if (data.totalCards === findeds) {
                            resetData()
                        }
                    }, LOAD_TIME)
                } else {
                    setData(prev => ({...prev, unlocked: false}))
                    setTimeout(() => {
                        setData(prev => ({...prev, cards: newCards, unlocked: true}))
                    }, LOAD_TIME)
                }
            }
        }
    }

    useEffect(() => {
        resetData()
    }, [resetData])

    return (
        <div className="game__container">
            <h1 className="game__title">Encontre os Pares</h1>
            <CardComponent
                cards={data.cards}
                onClickCard={handleOnCLickCard}
            />
        </div>
    )
}