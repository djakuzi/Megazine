

export const loadState = <T> (key: string): T | undefined =>{

    try {
        const jsonState = localStorage.getItem(key)
        if (!jsonState){
            return undefined
        } 

        return JSON.parse(jsonState)

    } catch (e) {
        console.log(e)
        return undefined
    }

}


export const saveState  = <T> (key: string, state: T ): void => {

    const json = JSON.stringify(state)

    localStorage.setItem(key, json)
}