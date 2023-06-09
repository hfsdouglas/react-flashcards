import { getNewId } from "../services/idService";

export default function RadioButton({ 
    children: buttonDescription = "Descrição do Botão", 
    id = getNewId(), name = "radioButtonName",
    buttonChecked = false,
    onButtonClick = null
}) {
    function handleRadioButtonChange() {
        if (onButtonClick) {
            onButtonClick();
        }
    }

    return(
        <div className="flex flex-row items-center space-x-2">
            <input 
                type="radio" 
                id={ id } 
                name="name" 
                checked={ buttonChecked }
                onChange={ handleRadioButtonChange }
            />
            <label htmlFor={ id }>{ buttonDescription }</label>
        </div>
    );
}