export const FeedLoading = () => {
    return {
        type: 'START_LOADING_MAIN_FEED'
    }
}

export const FeedLoaded = (shouts) => {
    return {
        type: 'DONE_LOADING_MAIN_FEED',
        shouts: shouts
    }
}

export const NewShout = shout => {
    return {
        type: 'NEW_SHOUT',
        shout: shout
    }
}
