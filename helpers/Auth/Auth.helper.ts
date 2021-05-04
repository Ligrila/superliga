

export default class AuthHelper {
    // Format user like store
    formatAuthUser(response) {
        let data: any = {}
        if (response.data) {
            data = response.data.user;
            let lives = 0;
            if (data.life) {
                lives = data.life.lives;
            }
            if (data.infinite_lives && data.infinite_lives[0]) {
                lives = 100000;
            }
            data.lives = lives;
        }
        return data;
    }    
}