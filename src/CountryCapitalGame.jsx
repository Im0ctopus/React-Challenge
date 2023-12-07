import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function CountryCapitalGame({ data }) {
    const [clicked, setClicked] = useState();
    const keys = Object.keys(data);
    const values = Object.values(data);
    const [all, setAll] = useState([...keys, ...values]);
    useEffect(() => {
        var random = [...all];
        for (let i = 0; i < random.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [random[i], random[j]] = [random[j], random[i]];
        }
        setAll(random);
    }, []);
    const [wrong, setWrong] = useState([]);
    function handleClicked(name) {
        setWrong([]);
        if (clicked) {
            if (data.hasOwnProperty(clicked) && data[clicked] === name) {
                const temp = all.filter((temp) => temp != clicked);
                const temp2 = temp.filter((temp) => temp != name)
                setAll(temp2);
                setClicked(null);
            } else if (data.hasOwnProperty(name) && data[name] === clicked) {
                const temp = all.filter((temp) => temp != name);
                const temp2 = temp.filter((temp) => temp != clicked)
                setAll(temp2);
                setClicked(null);
            } else {
                setWrong([clicked, name]);
                setClicked(null);
            }
        } else {
            setClicked(name);
        }
    }

    return (
        <div className="game">
            {all.length > 0 ?
                all.map((name, Index) => (
                    <button onClick={() => handleClicked(name)} className={`${clicked == name ? 'game_button_blue' : ''} ${wrong.includes(name) ? 'game_button_red' : ''} game_button`} key={Index}>{name}</button>
                ))
                :
                <p>Congratulations</p>
            }
        </div>
    )
}

export default CountryCapitalGame;