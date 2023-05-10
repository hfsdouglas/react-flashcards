//  React Hooks 
import { useEffect, useState } from 'react';

// Components
import FlashCards from '../components/FlashCards';
import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import Button from '../components/Button';

//Database
import { apiGetAllFlashCards } from '../services/apiService';

// Helpers Functions
import { helperShuffleArray } from '../helpers/arrayHelpers';
import RadioButton from '../components/RadioButton';

export default function FlashCardsPage() {
    
    const [allCards, setAllCards] = useState([]);
    const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

    useEffect(() => {
        apiGetAllFlashCards().then(allFlashCards => {
            setAllCards(allFlashCards);
        });
    }, []);

    function handleButtonClick() {
        const shuffledCards = helperShuffleArray(allCards);
        setAllCards(shuffledCards);
    }

    function handleRadioButtonTitleClick() {
        const updatedCards = [...allCards].map(card => ({
            ...card, 
            showTitle: true
        }));
        
        setAllCards(updatedCards);
        setRadioButtonShowTitle(true);
    }

    function handleRadioButtonDescriptionClick() {
        const updatedCards = [...allCards].map(card => ({
            ...card, 
            showTitle: false
        }));

        setAllCards(updatedCards);
        setRadioButtonShowTitle(false);
    }

    function handleToggleFlashCard(cardId) {
        const updatedCards = [...allCards];
        const cardIndex = updatedCards.findIndex(card => card.id === cardId);
        updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
        setAllCards(updatedCards);
    }

    return(
        <>
            <Header>react-flash-cards-v3</Header>
            <div className="text-center mb-4">
                <Button onButtonClick={ handleButtonClick }>Embaralhar Cards</Button>
            </div>
            <div className='flex flex-row items-center justify-center space-x-4 m-4'>
                <RadioButton 
                    id='radioButtonShowTitle' 
                    name='showInfo' 
                    buttonChecked={ radioButtonShowTitle }
                    onButtonClick={ handleRadioButtonTitleClick }
                >
                    Mostrar Título
                </RadioButton>
                <RadioButton 
                    id='radioButtonShowDescription' 
                    name='showInfo' 
                    buttonChecked={ !radioButtonShowTitle }
                    onButtonClick={ handleRadioButtonDescriptionClick }
                >
                    Mostrar Descrição
                </RadioButton>
            </div>
            <Main>
                <FlashCards>
                    {
                        allCards.map(({ id, title, description, showTitle }) => {
                            return <FlashCard 
                                        id={id}
                                        title={title} 
                                        description={description} 
                                        key={id}
                                        showFlashCardTitle={showTitle} 
                                        onToggleFlashCard= {handleToggleFlashCard}
                                    />
                        })
                    }
                </FlashCards>
            </Main>
        </>
    )
}