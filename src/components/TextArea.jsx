import { getNewId } from "../services/idService";

export default function TextArea({ 
    labelDescription = 'Descrição do Label:', 
    textareaValue = 'Valor padrão do Textarea',
    onTextAreaChange = null,
    id = getNewId(),
    maxLength = 230,
    rows = 4
}) {
    function handleTextAreaChange({ currentTarget }) {
        if (onTextAreaChange) {
            const newName = currentTarget.value;
            onTextAreaChange(newName);
        }
    }

    const currentCharacterCount = textareaValue.length;

    return (
        <div className="flex flex-col my-4">
            <label className="text-sm mb-1" htmlFor={id}>{ labelDescription }</label>
            <textarea 
                id={id} 
                className="border p-1" 
                value={ textareaValue } 
                onChange={ handleTextAreaChange } 
                maxLength={ maxLength }
                rows={ rows }
            />
            <div className="text-right mr-1">
                <span>{ currentCharacterCount } / { maxLength }</span>
            </div>
        </div>
    )
}