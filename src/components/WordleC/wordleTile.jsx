import React from 'react';


export default function WordleTile() {
    const [letter, setLetter] = useState('K')
    const [completed, setCompleted] = useState(true)
    const [color, setColor] = useState({back: 'white', font: 'black'})


    const style = {
        backgroundColor: color.back,
        color: color.font
    }

    return (
        <div style={style} className = "flex justify-center my-[2px} items-center w-[62px] h-[62px] border-2">
            <p className='flex self-center mb-2 font-bold text-5xl'>{letter}</p>
        </div>
    );
 }
