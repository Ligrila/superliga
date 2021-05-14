import { TRIVIA_TIMEOUT } from "../../constants/Trivia.constants";
import { defaultValue, getTriviaQuestion, triviaQuestionAtom } from "../../recoil/TriviaQuestion.recoil";


export default class TriviaQuestionUtility {

    static onAddNew(q) {
        let timeout = q.timeout ? q.timeout : TRIVIA_TIMEOUT;
        const newTriviaQuestion = {
            ...defaultValue,
            hasQuestion: true,
            currentQuestion: q,
            currentTimestap: new Date().getTime(),
            currentTimeout: timeout,
            timedOut: false
        };
        return newTriviaQuestion;

    }

    static getResetOnNetworkFail() {
        return {
            ...defaultValue,
            answered: false,
            answeredOption: null,
            answeredServerResponse: null
        }
    }
    static getReset() {
        return defaultValue;
    }
    // When user answer question 
    /**
     * 
     * @param currentTriviaQuestion 
     * @param option 
     * @param response (Promise)
     * @returns 
     */
    static answerQuestion(currentTriviaQuestion, option, response) {
        return {
            ...currentTriviaQuestion,
            answered: true,
            answeredOption: 'option_' + option,
            answeredServerResponse: response
        }

    }

    static async onFinishedQuestion(questionFinished) {
        return new Promise(async(resolve) => {
            const currentTriviaQuestion = await getTriviaQuestion();
            console.log('currentTriviaQuestion', currentTriviaQuestion)
            if (!currentTriviaQuestion.hasQuestion) {
                resolve(null);
            }
            if (currentTriviaQuestion.currentQuestion.id == questionFinished.id) {
                if (currentTriviaQuestion.answeredServerResponse) {
                    currentTriviaQuestion.answeredServerResponse.then((data) => {
                        resolve({
                            ...currentTriviaQuestion,
                            hasQuestion: false,
                            currentQuestion: questionFinished,
                            correctOption: questionFinished.correct_option,
                            hasResult: true,
                            serverSuccess: data.success,
                            win: data.success && (questionFinished.correct_option == currentTriviaQuestion.answeredOption)
                        })
                    }).catch(e => {
                        console.log("error enviando respuesta", e)
                        resolve({
                            ...currentTriviaQuestion,
                            hasQuestion: false,
                            currentQuestion: questionFinished,
                            correctOption: questionFinished.correct_option,
                            hasResult: true,
                            serverSuccess: false,
                            win: false
                        })                     
                    });
                } else {
                    resolve({
                        ...currentTriviaQuestion,
                        hasQuestion: false,
                        correctOption: questionFinished.correct_option,
                        currentQuestion: questionFinished,
                        hasResult: true,
                        serverSuccess: false,
                        win: false
                    })
                }
            } else {
                console.log("Intentando finalizar a una pregunta que no es la actual");
                return resolve(this.onFinishedQuestion(questionFinished))
            }            

        })


    }

}