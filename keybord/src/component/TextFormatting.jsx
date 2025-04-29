function TextFormatting(props) {
    const fontOptions = ['Franklin Gothic Medium', 'Arial Narrow', "Haettenschweiler", 'sans-serif'];

    function languageClick(e) {
        let lan = e.target.value;
        props.keyboardNumber(lan);
    }

    function colorClick(e) {
        let clr = e.target.value;
        props.kindColor(clr);
    }

    const handleFontSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        props.fontSize(newSize);
    };

    const handleFontChange = (e) => {
        const newFont = e.target.value;
        props.fontType(newFont);
    };

    return (
        <div className="textFormattingContainer">
            <button onClick={props.selectAll}>
                {props.isSelected ? 'Unselect All' : 'Select All'}
            </button>

            <button onClick={props.goBack}>Go Back</button>
            <input
                type="number"
                onChange={handleFontSizeChange}
                min="20"
                max="80"
                step="4"
                placeholder="20"
            />

            <div className="color">
                <button> color
                    <input type="color" onChange={colorClick} />
                </button>
            </div>

            <select onChange={handleFontChange}>
                {fontOptions.map((font) => (
                    <option key={font} value={font}>
                        {font}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TextFormatting;
