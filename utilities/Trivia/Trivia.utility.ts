import { GamePlayStatus, getCurrentTrivia, setCurrentTrivia, setCurrentTriviaFinished } from "../../recoil/CurrentTrivia.recoil";

export default class TriviaUtility {

    static getGameStatusFromData(data) {
        let gamePlayStatus = GamePlayStatus.START_GAME;
        if(data.half_time_finished){
            gamePlayStatus = GamePlayStatus.FINISH_HALF_TIME;
        }
        if(data.half_time_started){
            gamePlayStatus = GamePlayStatus.START_HALF_TIME;
        }
        return gamePlayStatus;
    }

    static async onStartTrivia(payload) {
        const newTrivia = {
            hasData: true,
            data: {
                ...payload,
                gamePlayStatus: GamePlayStatus.START_GAME
            }
        }
        await setCurrentTrivia({ ...newTrivia });

    }
    static async onShowBanner(payload) {
        const currentTrivia = await getCurrentTrivia();
        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.trivia_id) {

            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    gamePlayStatus: GamePlayStatus.SHOW_BANNER_GAME,
                    bannerData: payload
                }
            }

            await setCurrentTrivia({ ...newTrivia });
        }
    }
    static async onFinishGame(payload) {
        const currentTrivia = await getCurrentTrivia();
        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.id) {
            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    game_finished: true,
                    gamePlayStatus: GamePlayStatus.FINISH_GAME
                }
            }

            await setCurrentTrivia({ ...newTrivia });
        }
    }
    static async onFinishTrivia(payload) {
        const currentTrivia = await getCurrentTrivia();
        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.id) {
            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    game_finished: true,
                    finish_trivia: true,
                    gamePlayStatus: GamePlayStatus.FINISH_TRIVIA
                }
            }
            // Set Atom to finished
            await setCurrentTriviaFinished({ ...newTrivia });
            // Set Current Trivia Empty :)
            await setCurrentTrivia({
                hasData: false,
                data: undefined
            });

        }
    }
    static async onFinishHalfTime(payload) {
        const currentTrivia = await getCurrentTrivia();

        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.id) {
            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    half_time_finished: true,
                    half_time_started: false,
                    gamePlayStatus: GamePlayStatus.FINISH_HALF_TIME
                }
            }
            await setCurrentTrivia({ ...newTrivia });
        }
    }

    static async onStartHalfTime(payload) {
        const currentTrivia = await getCurrentTrivia();

        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.id) {
            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    half_time_finished: true,
                    half_time_started: true,
                    gamePlayStatus: GamePlayStatus.START_HALF_TIME
                }
            }
            await setCurrentTrivia({ ...newTrivia });
        }
    }
    static async onStartHalfTimePlay(payload) {
        const currentTrivia = await getCurrentTrivia();

        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.id) {
            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    gamePlayStatus: GamePlayStatus.START_HALF_TIME_PLAY
                }
            }
            await setCurrentTrivia({ ...newTrivia });
        }
    }

    static async onStartExtraPlay(payload) {
        const currentTrivia = await getCurrentTrivia();

        if (!currentTrivia.hasData) {
            return;
        }
        if (currentTrivia.data.id == payload.id) {
            const newTrivia = {
                hasData: true,
                data: {
                    ...currentTrivia.data,
                    gamePlayStatus: GamePlayStatus.START_EXTRA_PLAY
                }
            }
            await setCurrentTrivia({ ...newTrivia });
        }
    }

}