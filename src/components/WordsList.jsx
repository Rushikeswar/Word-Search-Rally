import React from 'react';

export default function WordsList({ words}) {
    return (
        <>
        <ul id="words-list">
            {words.map((word) => (
                <li
                    key={word}
                    id={`word-${word}`}
                >
                    {word}
                </li>
            ))}
        </ul>
        </>
    );
}