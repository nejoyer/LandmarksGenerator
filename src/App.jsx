import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, HexUtils, GridGenerator, Text } from 'react-hexgrid';
import './App.css'; // Import the CSS file

function App() {
  const [hexagons, setHexagons] = useState(GridGenerator.hexagon(3));

  const regenerateGrid = (difficulty) => {
    // create an array to hold the hexagons with special designations
    var usedHexagons = [];
    var treasureHexagons = [];
    var waterHexagons = [];
    var trapHexagons = [];
    var curseHexagons = [];
    var amuletHexagons = [];
    var exitHexagons = [];
    var teamOneHexagons = [];
    var teamTwoHexagons = [];
    const newHexagons = GridGenerator.hexagon(3);

    // choose a random hexagon to be the initial one
    const startingHex1 = newHexagons[Math.floor(Math.random() * newHexagons.length)];
    usedHexagons.push(startingHex1);

    // choose an adjacent hexagon to be the second one
    const startingHex2Choices = newHexagons.filter(hex => {
      const distance = HexUtils.distance(startingHex1, hex);
      return distance === 1;
    });

    const startingHex2 = startingHex2Choices[Math.floor(Math.random() * startingHex2Choices.length)];
    usedHexagons.push(startingHex2);

    // choose the third hexagon based on difficulty
    const startingHex3Choices = newHexagons.filter(hex => {
      const distance1 = HexUtils.distance(startingHex1, hex);
      const distance2 = HexUtils.distance(startingHex2, hex);
      return (distance1 === 1 || distance2 === 1) && !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
    });

    const startingHex3 = startingHex3Choices[Math.floor(Math.random() * startingHex3Choices.length)];
    usedHexagons.push(startingHex3);

    // Map the treasure hexagons based on difficulty
    var treasureHexagonCount = 0;
    switch (difficulty) {
      case 'easy':
        treasureHexagonCount = 3;
        break;
      case 'hard':
        treasureHexagonCount = 4;
        break;
      case 'competitive':
        treasureHexagonCount = 2;
        break;
    }
    for(let i = 0; i < treasureHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var treasureHexagon = unusedHexagons[randomIndex];
        treasureHexagons.push(treasureHexagon);
        usedHexagons.push(treasureHexagon);
    }

    // Map the water hexagons based on difficulty
    var waterHexagonCount = 0;
    switch (difficulty) {
      case 'easy':
        waterHexagonCount = 3;
        break;
      case 'hard':
        waterHexagonCount = 4;
        break;
      case 'competitive':
        waterHexagonCount = 0;
        break;
    }
    for(let i = 0; i < waterHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var waterHexagon = unusedHexagons[randomIndex];
        waterHexagons.push(waterHexagon);
        usedHexagons.push(waterHexagon);
    }

    // Map the trap hexagons based on difficulty
    var trapHexagonCount = 0;
    switch (difficulty) {
      case 'easy':
        trapHexagonCount = 4;
        break;
      case 'hard':
        trapHexagonCount = 5;
        break;
      case 'competitive':
        trapHexagonCount = 0;
        break;
    }
    for(let i = 0; i < trapHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var trapHexagon = unusedHexagons[randomIndex];
        trapHexagons.push(trapHexagon);
        usedHexagons.push(trapHexagon);
    }

    // Map the curse hexagons based on difficulty
    var curseHexagonCount = 0;
    switch (difficulty) {
      case 'easy':
        curseHexagonCount = 3;
        break;
      case 'hard':
        curseHexagonCount = 5;
        break;
      case 'competitive':
        curseHexagonCount = 6;
        break;
    }
    for(let i = 0; i < curseHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var curseHexagon = unusedHexagons[randomIndex];
        curseHexagons.push(curseHexagon);
        usedHexagons.push(curseHexagon);
    }

    // Map the amulet hexagon
    const amuletHexagonCount = 1;
    for(let i = 0; i < amuletHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var amuletHexagon = unusedHexagons[randomIndex];
        amuletHexagons.push(amuletHexagon);
        usedHexagons.push(amuletHexagon);
    }

    // Map the exit hexagon
    const exitHexagonCount = difficulty === 'competitive' ? 0 : 1;
    for(let i = 0; i < exitHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var exitHexagon = unusedHexagons[randomIndex];
        exitHexagons.push(exitHexagon);
        usedHexagons.push(exitHexagon);
    }

    const teamOneHexagonCount = difficulty === 'competitive' ? 4 : 0; 
    for(let i = 0; i < teamOneHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var teamOneHexagon = unusedHexagons[randomIndex];
        teamOneHexagons.push(teamOneHexagon);
        usedHexagons.push(teamOneHexagon);
    }

    const teamTwoHexagonCount = difficulty === 'competitive' ? 4 : 0;
    for(let i = 0; i < teamTwoHexagonCount; i++) {
        var unusedHexagons = newHexagons.filter(hex => {
            return !usedHexagons.some(usedHex => usedHex.q === hex.q && usedHex.r === hex.r && usedHex.s === hex.s);
        });
        var randomIndex = Math.floor(Math.random() * unusedHexagons.length);
        var teamTwoHexagon = unusedHexagons[randomIndex];
        teamTwoHexagons.push(teamTwoHexagon);
        usedHexagons.push(teamTwoHexagon);
    }
    
    const coloredHexagons = newHexagons.map(hex => {
      hex.props = hex.props || {};
      if (hex.q === startingHex1.q && hex.r === startingHex1.r && hex.s === startingHex1.s) {
        hex.props.className = 'start';
        hex.props.text = '1';
      }
      if (hex.q === startingHex2.q && hex.r === startingHex2.r && hex.s === startingHex2.s) {
        hex.props.className = 'start';
        hex.props.text = '2';
      }
      if (hex.q === startingHex3.q && hex.r === startingHex3.r && hex.s === startingHex3.s) {
        hex.props.className = 'start';
        hex.props.text = '3';
      }
        if (treasureHexagons.some(treasureHex => treasureHex.q === hex.q && treasureHex.r === hex.r && treasureHex.s === hex.s)) {
            hex.props.className = 'treasure';
            hex.props.text = 'Treasure';
        }
        if (waterHexagons.some(waterHex => waterHex.q === hex.q && waterHex.r === hex.r && waterHex.s === hex.s)) {
            hex.props.className = 'water';
            hex.props.text = 'Water';
        }
        if (trapHexagons.some(trapHex => trapHex.q === hex.q && trapHex.r === hex.r && trapHex.s === hex.s)) {
            hex.props.className = 'trap';
            hex.props.text = 'Trap';
        }
        if (curseHexagons.some(curseHex => curseHex.q === hex.q && curseHex.r === hex.r && curseHex.s === hex.s)) {
            hex.props.className = 'curse';
            hex.props.text = 'Curse';
        }
        if (amuletHexagons.some(amuletHex => amuletHex.q === hex.q && amuletHex.r === hex.r && amuletHex.s === hex.s)) {
            hex.props.className = 'amulet';
            hex.props.text = 'Amulet';
        }
        if (exitHexagons.some(exitHex => exitHex.q === hex.q && exitHex.r === hex.r && exitHex.s === hex.s)) {
            hex.props.className = 'exit';
            hex.props.text = 'Exit';
        }
        if (teamOneHexagons.some(teamOneHex => teamOneHex.q === hex.q && teamOneHex.r === hex.r && teamOneHex.s === hex.s)) {
            hex.props.className = 'team-one';
            hex.props.text = 'Team 1';
        }
        if (teamTwoHexagons.some(teamTwoHex => teamTwoHex.q === hex.q && teamTwoHex.r === hex.r && teamTwoHex.s === hex.s)) {
            hex.props.className = 'team-two';
            hex.props.text = 'Team 2';
        }
      return hex;
    });

    // Log the difficulty for debugging
    console.log(`Grid regenerated with difficulty: ${difficulty}`);

    setHexagons(coloredHexagons);
  };

  return (
    <div className="basic-example">
      <HexGrid width={500} height={500}>
        <Layout size={{ x: 7, y: 7 }}>
          {hexagons.map((hex, i) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              className={hex.props && hex.props.className ? hex.props.className : null}
            >
              <Text>{hex.props && hex.props.text ? hex.props.text : null}</Text>
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
      <div className="button-container">
        <button onClick={() => regenerateGrid('easy')}>Easy</button>
        <button onClick={() => regenerateGrid('hard')}>Hard</button>
        <button onClick={() => regenerateGrid('competitive')}>Competitive</button>
      </div>
      <a href="template.png" target="_blank" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>Template</a>
      <a href="items_table_easy.html" target="_blank" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>Easy Tracker</a>
      <a href="items_table_hard.html" target="_blank" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>Hard Tracker</a>
      <a href="result.html" target="_blank" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>Result</a>
    </div>
  );
}

export default App;
