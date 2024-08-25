import { wordsfromdatabase } from './words/words.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LevelSelection from './components/LevelSelection';
import Solve from './components/SolveButton';
import Play from './components/PlayButton';
import Endgame from './components/Endgame';
import Grid from './components/Grid';
import NextButton from './components/NextButton.jsx';
import GenerateButton from './components/GenerateButton';
import NewRallyButton from './components/NewRallyButton.jsx'
import Instructions from './components/Instructions';
import WordsList from './components/WordsList';
import { generateGrid, getRandomWords, placeWordsInGrid, fillRandomLetters, clearGridHighlights, clearWordListHighlights } from './utils';
import './styles.css'
export default function App() {
    const [grid, setGrid] = useState([]);
    const [first,setfirst]=useState(true);
    const [words, setWords] = useState([]);
    const [method, setMethod] = useState(-1); //-1 -> generated, 0 -> solve, 1 -> play
    const [notification, setNotification] = useState("");
    const [next,setNext]=useState(false);
    const [level, setLevel] = useState(() => {
        const storedLevel = localStorage.getItem('locallevel');
        return storedLevel ? JSON.parse(storedLevel) : 5;
    });

    const [maxi, setmaxi] = useState(() => {
        const storedMaxi = localStorage.getItem('localmaxi');
        return storedMaxi ? JSON.parse(storedMaxi) : 5;
    });
    const handleLevelChange = useCallback((newLevel) => {
        setLevel(newLevel);
    }, []);

    useEffect(() => {
        localStorage.setItem('locallevel', JSON.stringify(level));
    }, [level]);

    useEffect(() => {
        localStorage.setItem('localmaxi', JSON.stringify(maxi));
    }, [maxi,level]);

    const handlenextbutton = useCallback(() => {
        if (level <= 15) {
            setLevel((prevLevel) => {
                const newLevel = prevLevel + 1;
                setmaxi(newLevel);
                clearWordListHighlights();
                clearGridHighlights();
    
                const newGrid = generateGrid(newLevel);
                const newWords = getRandomWords(newLevel, wordsfromdatabase);
                const x = placeWordsInGrid(newGrid, newWords);
                const newGrid3 = fillRandomLetters(x.grid);
                
                setGrid(newGrid3);
                setWords(x.placedWords);
                setNotification("New level unlocked !!");
                setMethod(-1);
                setNext(false);
    
                return newLevel;  // Return the new level to update state
            });
        }
    }, [wordsfromdatabase]);
    

    const handlenewrally =useCallback(()=>{
        setLevel(5)
        setmaxi(5)
        setfirst(false);
        localStorage.setItem('localmaxi', JSON.stringify(Number(5)));
        localStorage.setItem('locallevel',JSON.stringify(Number(5)));
        if (level <= 15) {
            setLevel((prevLevel) => {
                clearWordListHighlights();
                clearGridHighlights();
                const newLevel=5;
                const newGrid = generateGrid(newLevel);
                const newWords = getRandomWords(newLevel, wordsfromdatabase);
                const x = placeWordsInGrid(newGrid, newWords);
                const newGrid3 = fillRandomLetters(x.grid);
                setGrid(newGrid3);
                setWords(x.placedWords);
                setNotification("New Rally Started!!");
                setMethod(-1);
                setNext(false);
    
                return newLevel;  // Return the new level to update state
            });
        }
    })


    const handleGeneratePuzzle = useCallback(() => {
        if(level<=15)
        {
        first&&setfirst(false);
        clearWordListHighlights();
        clearGridHighlights();
        const newGrid = generateGrid(level);
        const newWords = getRandomWords(level,wordsfromdatabase);
        const x= placeWordsInGrid(newGrid, newWords);
        const newGrid3 = fillRandomLetters(x.grid);
        setGrid(newGrid3);
        setWords(x.placedWords);
        if(grid.length){setNotification("Generated!");}
        setMethod(-1);
        }

    }, [first,level,wordsfromdatabase]);




    const gridMemoized = useMemo(() => <Grid grid={grid} level={level} />, [grid]);
    const wordsListMemoized = useMemo(() => <WordsList words={words} />, [words]);
    
    const solveButtonMemoized = useMemo(() => (
        (method !== 0 && method!==1 && level < maxi)&&(
            <Solve grid={grid} words={words} method={method} setMethod={setMethod} setNotification={setNotification} />
        )
    ), [grid, words, method]);

    const playButtonMemoized = useMemo(() => (
        method !== 1 && 
        (<Play grid={grid} words={words}  setMethod={setMethod} setNotification={setNotification} setNext={setNext} level={level}/>)
    ), [grid, words, method]);

    const endgameButtonMemoized = useMemo(() => (
        method === 1 && 
        (   <Endgame method={method} setMethod={setMethod} setNotification={setNotification} clearWordListHighlight={clearWordListHighlights}
        clearGridHighlights={clearGridHighlights}/>)
    ), [method]);

    const check=localStorage.getItem('locallevel')>5||localStorage.getItem('localmaxi')>5
    
    return (
        <>
        <h1 id="header">WORD SEARCH RALLY</h1>
        <div className="container">

        <div className='left'>
                {!first&&<LevelSelection level={level} onLevelChange={handleLevelChange} method={method} maxi={maxi}/>}
                {<GenerateButton onGeneratePuzzle={handleGeneratePuzzle} method={method} first={first}/>}
                <div className="buttons">
                {grid.length > 0 && (
                <div className="game-options" >
                        {solveButtonMemoized}
                        {playButtonMemoized}
                        {endgameButtonMemoized}
                {(next&&level<15)&& <NextButton onnextlevel={handlenextbutton}/>}
                </div>)}
                <div><p id='notification'>{notification}</p></div>
                {(!first||check)&&<NewRallyButton handlenewrally={handlenewrally} method={method} setNotification={setNotification}/>}
            </div>
        </div>

        <div className='middle'>
            {grid.length!=0&&<div className="grid-container"> {gridMemoized} </div>}

        </div>


        <div className='right'>
            {first&&<Instructions/>}
            {method==1&&<div id="timer"></div>}
            {grid.length!=0&&<div style={{fontSize:28,color:`green`}}>Find me...</div>}
            <div className="words-container">{wordsListMemoized}</div>
        </div>

        </div>
        </>
    );
}