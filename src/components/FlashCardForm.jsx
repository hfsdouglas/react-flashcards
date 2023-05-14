import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import Button from "./Button";

export default function FlashCardForm({ createMode = true, onPersist = null, children: flashCard = null }) {
    const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
    const [title, setTitle] = useState(flashCard?.title || '');
    const [description, setDescription] = useState(flashCard?.description || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (createMode) {
            setTitle('');
            setDescription('');
        }
    }, [createMode])

    function clearFields() {
        setTitle('');
        setDescription('');
    }
    
    function handleInputChange(newTitle) {
        setTitle(newTitle);
    }

    function handleTextAreaChange(newDescription) {
        setDescription(newDescription);
    }

    function validateForm() {
        return title.trim() !== '' && description.trim() !== '';
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            setError('');
            if (onPersist) {
                onPersist(title, description);
                clearFields();
            }
        } else {
            setError('O preenchimento de Título e Descrição é obrigatório!');
            alert(error);
        }

    }

    function handleFormReset() {
        clearFields();
    }

    return (
        <form className={ `${backgroundClassName} p-4` } onSubmit={ handleFormSubmit } onReset={ handleFormReset }>
            <h2 className="text-center font-semibold">Manutenção de FlashCards</h2>
            <TextInput labelDescription="Título: " inputValue={ title } onInputChange={ handleInputChange }></TextInput>
            <TextArea labelDescription="Descrição: " textareaValue={ description } onTextAreaChange={ handleTextAreaChange } ></TextArea>
            <div className="flex items-center justify-end">
                <Button colorClass="bg-red-200" type="reset">Limpar</Button>
                <Button colorClass="bg-green-300" type="submit">Salvar</Button>
            </div>
        </form>
    );
}