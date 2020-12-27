import React, { useRef, useEffect, useState } from 'react';
import InputManager from '../../utilities/InputManager';
import Player from '../../NPCs/Player';
import World from '../../World/World';

const ReactRogue = ({ width, height, tileSize }) => {
  const canvasRef = useRef();
  let inputManager = new InputManager();
  const [player, setPlayer] = useState(new Player(1, 2, tileSize));
  const [world, setWorld] = useState(new World(width, height, tileSize));
  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newPlayer = new Player();
    Object.assign(newPlayer, player);
    newPlayer.move(data.x, data.y);
    setPlayer(newPlayer);
  }

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    console.log("Draw to canvas")
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    world.draw(ctx);
    player.draw(ctx);
  })
  return (
  <canvas 
    ref={canvasRef}  
    width={width * tileSize} 
    height={height * tileSize} 
    style={{ border: '1px solid black' }}
  ></canvas>)
}

export default ReactRogue;