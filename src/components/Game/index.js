/* Imports */
import './game.scss';
import PropTypes from 'prop-types';

/* Componant main function */
function Game({ chargedImgSrc, puzzlePiecesNumber, aspectRatio, imageOrientation }) {
  /* Function that return a random integer */
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /* Variable to store the current dragged piece id */
  let currentDragPieceId;

  /* Function that return an array of index equal to puzzle pieces number */
  const getAnArrayOfPieces = () => {
    const array = [];
    for(let i = 0; i < puzzlePiecesNumber; i++) {
      array.push(i);
    }
    return array;
  };

  /* Function that return an array of objects */
  const generatePiecesWithRandomDispatching = () => {
    //Variables to determine position coordonates
    let currentCol = 0 //Current column
    let currentRow = 0 //Current row
    let col = getWidth() / 10; //Column size (expressed in pixels later)
    let row = getHeight() / 6; //Row size (expressed in pixels later)
    const arrayOfObject = []; //Object array initialization
    //Loop on the number of pieces
    for(let i = 0; i < getAnArrayOfPieces().length; i++) {
      //For a more even distribution of pieces 
      if(currentCol == 10){
        currentRow++;
        currentCol = 0;
        }
      //Push an object to the arrayOfObject
      arrayOfObject.push({
        //Store a vertical axis position
        y: Math.floor((row *currentRow) * -1),
        //Store an horizontal axis
        x: Math.floor((col * currentCol)* -1),
        //Store an id
        id: i,
      })
      currentCol++;
    }
    //Return an array OfObject
    return arrayOfObject;
  };

  /* This part contain 6 handlers function to manage each drag and drop events on every concerned elements */

  /* Handler on drop elements */
  const handleOnDrop = (event) => {
    //Target is no more loses its hovered class 
    event.target.classList.toggle('hovered');
    //Condition to check if the target match with dragged piece
    if(event.target.textContent === currentDragPieceId){
      //Store current dragged piece in a constant 
      const currentPiece = document.getElementById(currentDragPieceId);
      //Apply new style to this piece
      currentPiece.classList.add('fit-content')
      //Remove the textContant in the drop area
      event.target.textContent = '';
      //Inserting the dragged part into the target
      event.target.append(currentPiece);
      //Current dragged piece is no more draggable
      currentPiece.draggable = false;
      }
  };

  /* Handler on drag over event */
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /* Handler on drag enter event */
  const handleOnDragEnter = (event) => {
    event.preventDefault();
    //To inform the user wich area is droppable
    event.target.classList.toggle('hovered');
  };

  /* Handler on drag leave event */
  const handleOnDragLeave = (event) => {
    //Remove hovered class
    event.target.classList.toggle('hovered');
  };

  /* Hazndler on drag start event */
  const handleOnDragStart = (event)=> {
    //Use the previously declared variable to store the target id
    currentDragPieceId = event.target.id;
    //Use of a timer to hide the piece that will be dragged only to its starting positionroom
    setTimeout(() => {
      event.target.style.visibility = 'hidden';
    })
  };

  /* Handler on drag end event */
  const handleOnDragEnd = (event) => {
    //Make visible again of the dragged piece if it was not dropped on the correct position
    event.target.style.visibility = 'visible';
  };

  /* -------------------------------------------------------------------------------------------------------- */

  /* Size maker:  */

  /* Return a height value wich depend of image orientation's and aspect ratio's values */
  const getHeight = () => {
    if(imageOrientation === 'landscape') {
      return 350;
    } 
    return switchOnRatios();
  };

  /* Return a width value wich depend of image orientation's and aspect ratio's values */
  const getWidth = () => {
    if(imageOrientation === 'landscape') {
      console.log(switchOnRatios());
      return switchOnRatios();
    }
    return 350;
  };

  /* Switch condition to return a size wich depend of aspect ratio's value  */
  const switchOnRatios = () => {
    switch (aspectRatio) {
      case '16/9':
        return (350*16)/9;
      case '4/3':
        return (350*4)/3;
      case '3/2':
        return (350*3)/2;
      case '1/1':
        return 350
    }
  };

  /* Returned JSX by the component (two main elements: puzzle pieces drop area and puzzle pieces area) */
  return (
    <div className="game">
      <div className="main-container">

        <div style={{width: getWidth(), height:getHeight()}} className="puzzle">
            {chargedImgSrc != '' ? <img src={chargedImgSrc}/> : ''}
            {getAnArrayOfPieces().map((piece) => (
              <div 
                className="puzzle__piece-space" 
                key={piece}
                onDragEnter={handleOnDragEnter}
                onDragLeave={handleOnDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                >{piece}  
              </div>
            ))}
        </div>

        <div className="pieces-container">
          {generatePiecesWithRandomDispatching().map((obj) => (
            <div 
              className="pieces-container__piece" 
              key={obj.id}
              id={obj.id}
              style={{
                backgroundImage: `url(${chargedImgSrc})`,
                backgroundSize: `${getWidth()}px ${getHeight()}px`,
                top: `${getRandomInt(0, (350 - 60))}px`,
                left: `${getRandomInt(0, (622 - 80))}px`,
                backgroundPosition: `${obj.x}px ${obj.y}px`,
                width: `calc((${getWidth()}px * 10)/100)`,
                zIndex: `${obj.id}`,
              }}
              draggable
              onDragStart={handleOnDragStart}
              onDragEnd={handleOnDragEnd}
              >{obj.id}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

/* Properties types */
Game.propTypes = {
  chargedImgSrc: PropTypes.string.isRequired,
  puzzlePiecesNumber: PropTypes.number.isRequired,
  aspectRatio: PropTypes.string.isRequired,
  imageOrientation: PropTypes.string.isRequired,
};
/* -------------- */

/* Export */
export default Game;
