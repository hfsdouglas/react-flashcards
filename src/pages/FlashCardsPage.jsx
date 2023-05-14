//  React Hooks 
import { useEffect, useState } from 'react';

// React Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Components
import FlashCards from '../components/FlashCards';
import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Error from '../components/Error';
import RadioButton from '../components/RadioButton';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';

//Database
import { apiCreateFlashCard, apiDeleteFlashCard, apiGetAllFlashCards, apiUpdateFlashCard } from '../services/apiService';

// Helpers Functions
import { helperShuffleArray } from '../helpers/arrayHelpers';

export default function FlashCardsPage() {
    
    // Back-End
    const [allCards, setAllCards] = useState([]);
    
    //Exclusivo para estudo
    const [studyCards, setStudyCards] = useState([]);
    const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [createMode, setCreateMode] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedFlashCard, setSelectedFlashCard] = useState(null);

    useEffect(() => {
        // Promise
        // apiGetAllFlashCards().then(allFlashCards => {
        //     setAllCards(allFlashCards);
        // });

        // IIFE
        // (async function getAllCards() {
        //     const backEndAllCards = await apiGetAllFlashCards();
        //     setAllCards(backEndAllCards);
        //     setLoading(false);
        // })();

        // Async / Await
        async function getAllCards() {
            try {
                const backEndAllCards = await apiGetAllFlashCards();
                setAllCards(backEndAllCards);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        }

        getAllCards();
    }, []);

    function handleShuffledButtonClick() {
        const shuffledCards = helperShuffleArray(studyCards);
        setStudyCards(shuffledCards);
    }

    useEffect(() => {
        setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
    }, [allCards]);

    function handleRadioButtonDescriptionClick() {
        const updatedCards = [...allCards].map(card => ({
            ...card, 
            showTitle: false
        }));

        setStudyCards(updatedCards);
        setRadioButtonShowTitle(false);
    }

    function handleRadioButtonTitleClick() {
        const updatedCards = [...studyCards].map(card => ({
            ...card, 
            showTitle: true
        }));
        
        setAllCards(updatedCards);
        setRadioButtonShowTitle(true);
    }


    function handleToggleFlashCard(cardId) {
        const updatedCards = [...studyCards];
        const cardIndex = updatedCards.findIndex(card => card.id === cardId);
        updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
        setStudyCards(updatedCards);
    }

    async function handleDeleteFlashCard(cardId) {
        try {
            await apiDeleteFlashCard(cardId);
            setAllCards(allCards.filter(card => card.id !== cardId));
            setError('');
        } catch (error) {
            setError(error.message);
        }
    }

    function handleEditFlashCard(card) {
      setCreateMode(false);
      setSelectedTab(1);
      setSelectedFlashCard(card);
    }

    function handleTabSelect(tabIndex) {
        setSelectedTab(tabIndex);
    }

    function handleNewFlashCard() {
        setCreateMode(true);
        setSelectedFlashCard(null);
    }

    async function handlePersist(title, description) {
        if (createMode) {
            try {
                const newFlashCard = await apiCreateFlashCard(title, description);
                setAllCards([...allCards, newFlashCard]);
                setError('');
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await apiUpdateFlashCard(selectedFlashCard.id, title, description);
                setAllCards(allCards.map(card => {
                    if (card.id === selectedFlashCard.id) {
                        return { ...card, title, description };
                    }
                    return card;
                })); 
                setSelectedFlashCard(null);
                setCreateMode(true);
                setError('');
            } catch (error) {
                setError(error.messsage);
            }
        }
    }

    let mainJsx = (
        <div className="flex justify-center my-4">
            <Loading />
        </div>
    )

    if (error) {
        mainJsx = <Error>{ error }</Error>;
    }

    if (!loading && !error) {
        mainJsx = (<>
            <Tabs selectedIndex={ selectedTab } onSelect={ handleTabSelect }>
                <TabList>
                    <Tab>Listagem</Tab>
                    <Tab>Cadastro</Tab>
                    <Tab>Estudo</Tab>
                </TabList>
                <TabPanel>
                    {
                        allCards.map(flashCard => {
                            return <FlashCardItem 
                            key={ flashCard.id } 
                            onDelete={ handleDeleteFlashCard }
                            onEdit={ handleEditFlashCard } 
                            >
                                { flashCard }
                            </FlashCardItem>
                        })
                    }
                </TabPanel>
                <TabPanel>
                    <div className='my-4'>
                        <Button onButtonClick={ handleNewFlashCard } >Novo FlashCard</Button>
                    </div>
                    <FlashCardForm 
                        createMode={ createMode } 
                        onPersist={ handlePersist }
                    >
                        { selectedFlashCard }
                    </FlashCardForm>
                </TabPanel>
                <TabPanel>
                    <div className="text-center mb-4">
                        <Button onButtonClick={ handleShuffledButtonClick }>Embaralhar Cards</Button>
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
                    <FlashCards>
                        {
                            studyCards.map(({ id, title, description, showTitle }) => {
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
                </TabPanel>
            </Tabs>
            
        </>);
    }

    return(
        <>
            <Header>react-flash-cards-v3</Header>
            
            <Main>{ mainJsx }</Main>
        </>
    )
}