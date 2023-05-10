export default function FlashCard({
    id = null, 
    title = 'Titulo do Card', 
    description = 'Descrição do Card',
    showFlashCardTitle = true,
    onToggleFlashCard = null 
}) {
    
    const fontSizeClassName = showFlashCardTitle ? 'text-lg' : 'text-sm';

    function handleCardClick() {
        if (onToggleFlashCard) {
            onToggleFlashCard(id);
        }
    }
    
    return (
        <div 
            className={`
                shadow-lg 
                p-4
                m-2 
                w-64 
                h-52 
                flex 
                flex-row 
                items-center 
                justify-center
                font-semibold
                cursor-pointer
                ${fontSizeClassName}
            `}

            style={{fontFamily: "'Courier New', 'JetBrains Mono', 'monospace'"}}
            onClick={ handleCardClick }
        >
            { showFlashCardTitle ? title : description }
        </div>
    )
}