import got from 'got'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';
import random from './words.js';
const rl = readline.createInterface({ input, output });
import chalkAnimation from 'chalk-animation';
const delay = ms => new Promise(r => setTimeout(r, ms))


(async() => {
    console.log(chalk.blue('Difficulty :') + "\n" + chalk.greenBright('1 = EASY') + "\n" + chalk.red('2 = HARD'))
    const difficulty = await rl.question(chalk.blue('>> '))
    var word
    console.clear()
    if (difficulty == '1') {
        console.log(chalk.greenBright('Selected difficulty 1(EASSY)'))
        await delay(500)
        console.clear()
        word = random().toUpperCase()
    } else if (difficulty == '2') {
        console.log(chalk.greenBright('Selected difficulty 2(Hard)'))
        await delay(500)
        console.clear()
        const { body } = await got('http://random-word-api.herokuapp.com/word?length=5')
        word = (JSON.parse(body))[0].toUpperCase()
    } else {
        console.log(chalk.redBright('Invalid Option!'))
        console.log(chalk.greenBright('Selected difficulty 1(EASSY)'))
        word = random().toUpperCase()
    }
    for (let _i = 0; _i < 6; _i++) {
        const answer = await Process();
        var colored = [];
        for (let i = 0; i < 5; i++) {
            if (word.includes(answer[i])) {
                if (word[i] == answer[i]) {
                    colored.push(chalk.white.bgGreenBright.bold(answer[i]));
                } else {
                    colored.push(chalk.whiteBright.bgYellowBright.bold(answer[i]));
                }
            } else {
                colored.push(chalk.whiteBright.bold(answer[i]));
            }
        }
        console.log(colored.join(""))

        if (answer == word) {
            chalkAnimation.rainbow("\n\nYou have gussed the secret word🏆!\n")
            await delay(1100);
            console.clear()
            console.log(chalk.green.bold("Would You like to play it again?(y/n)\n"))
            const restart = await rl.question(chalk.blue('>> '))
            if (restart == 'y') {
                console.clear();
                return Main();
            } else {
                chalkAnimation.radar('Man got tired already ʕತ_ತʔ', 0.5);
                await delay(4000);
                console.clear()
                console.log(chalk.gray("Man got tired already..."))
                process.exit()
            }
        }
        if (_i == 5) {
            console.log(chalk.red.bold("You lose this game!\n"), '"Get Good"\n   -Creater')
            throw ('Skill Issues')
        }
    }
})();

async function Process() {
    const answer = (await rl.question(chalk.blue('>> '))).toUpperCase()
    if (answer.length != 5) {
        console.log(chalk.bold.red("Enter a 5 letter word"))
        return Process()
    }
    const i = got(`https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`).then(() => { return answer }
    ).catch(() => {
        console.log(chalk.bold.red("Enter a valid english word"))
        return Process()
    })
    return i;
}