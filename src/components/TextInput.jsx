export default function TextInput({ 
    labelDescription = 'Descrição do Label:', 
    inputValue = 'Valor Padrão do Input',
    onInputChange = null,
    id = 'id_do_input_text'
}) {
    function handleInputChange({ currentTarget }) {
        if (onInputChange) {
            const newName = currentTarget.value;
            onInputChange(newName);
        }
    }

    return (
        <div className="flex flex-col my-4">
            <label className="text-sm mb-1" htmlFor={id}>{ labelDescription }</label>
            <input id={id} className="border p-1" type="text" value={ inputValue } autoFocus onChange={ handleInputChange } />
        </div>
    )
}