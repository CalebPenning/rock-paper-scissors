import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { waitForX } from './utils'

type Move = 'rock' | 'paper' | 'scissors' | string

const rl = createInterface({ input, output })

async function startGame() {
  console.log("Hello, let's play rock paper scissors.")
  const answer = await rl.question(
    'Solo mode or two player mode? Enter "1" for solo, "2" for two player.',
  )

  if (Number(answer) === 1) {
    await playSolo()
  }

  if (Number(answer) === 2) {
    await playTwoPlayer()
  } else {
    const askRestart = await rl.question(
      'Invalid option selected. Enter "y" to restart or any other key to exit.',
    )
    if (askRestart.toLowerCase() === 'y') await startGame()
    else return process.exit(0)
  }
}

async function playSolo() {
  console.log('Starting game...')
  waitForX(2)

  const updateScore = (player1Move: Move, player2Move: Move) => {
    const player1MoveNormalized = player1Move.toLowerCase()
    const player2MoveNormalized = player2Move.toLowerCase()

    console.log(`You chose: ${player1MoveNormalized}`)
    console.log(`Computer chose: ${player2MoveNormalized}`)

    const validMoves = ['rock', 'paper', 'scissors']

    if (
      !validMoves.includes(player1MoveNormalized) ||
      !validMoves.includes(player2MoveNormalized)
    ) {
      console.log('Invalid move entered, restarting round.')
      return
    }
    if (
      player1MoveNormalized === 'rock' &&
      player2MoveNormalized === 'scissors'
    ) {
      playerScore++
    }
    if (player1MoveNormalized === 'paper' && player2MoveNormalized === 'rock')
      playerScore++
    if (
      player1MoveNormalized === 'scissors' &&
      player2MoveNormalized === 'paper'
    )
      playerScore++
    if (
      player2MoveNormalized === 'rock' &&
      player1MoveNormalized === 'scissors'
    )
      computerScore++
    if (player2MoveNormalized === 'paper' && player1MoveNormalized === 'rock')
      computerScore++
    if (
      player2MoveNormalized === 'scissors' &&
      player1MoveNormalized === 'paper'
    )
      computerScore++
  }

  const getplayer2Move = () => {
    const randomNum = Math.random()
    if (randomNum <= 0.33) {
      return 'Rock'
    }
    if (randomNum >= 0.33 && randomNum <= 0.66) {
      return 'Paper'
    }
    return 'Scissors'
  }

  console.log('Get ready!')
  waitForX(2)
  console.log('Best two out of three rounds!')
  waitForX(2)

  let playerScore = 0
  let computerScore = 0

  while (playerScore < 3 && computerScore < 3) {
    const answer = await rl.question('Rock, paper, or scissors?')
    updateScore(answer, getplayer2Move())
  }

  console.log(`${playerScore === 3 ? 'You' : 'Computer'} won!`)
  waitForX(4)

  const askRestart = await rl.question(
    'Enter "y" to restart or any other key to exit.',
  )
  if (askRestart.toLowerCase() === 'y') await startGame()
  else {
    console.log('goodbye!')
    return process.exit(0)
  }
}

async function playTwoPlayer() {
  console.log('Beginning two player mode...')
  waitForX(2)

  let player1Score = 0
  let player2Score = 0

  const updateScore = (player1Move: Move, player2Move: Move) => {
    const player1MoveNormalized = player1Move.toLowerCase()
    const player2MoveNormalized = player2Move.toLowerCase()

    console.log(`Player 1 chose: ${player1MoveNormalized}`)
    console.log(`Player 2 chose: ${player2MoveNormalized}`)

    if (
      player1MoveNormalized === 'rock' &&
      player2MoveNormalized === 'scissors'
    ) {
      player1Score++
    }
    if (player1MoveNormalized === 'paper' && player2MoveNormalized === 'rock')
      player1Score++
    if (
      player1MoveNormalized === 'scissors' &&
      player2MoveNormalized === 'paper'
    )
      player1Score++
    if (
      player2MoveNormalized === 'rock' &&
      player1MoveNormalized === 'scissors'
    )
      player2Score++
    if (player2MoveNormalized === 'paper' && player1MoveNormalized === 'rock')
      player2Score++
    if (
      player2MoveNormalized === 'scissors' &&
      player1MoveNormalized === 'paper'
    )
      player2Score++
    return
  }

  while (player1Score < 3 && player2Score < 3) {
    const player1Answer = await rl.question('Player one, enter your move: ')
    const player2Answer = await rl.question('Player two, enter your move: ')
    updateScore(player1Answer, player2Answer)
  }

  console.log(`${player1Score === 3 ? 'Player one' : 'Player two'} wins!`)
  waitForX(4)

  const askRestart = await rl.question(
    'Enter "y" to restart or any other key to exit.',
  )
  if (askRestart.toLowerCase() === 'y') await startGame()
  else {
    console.log('goodbye!')
    return process.exit(0)
  }
}

startGame()
