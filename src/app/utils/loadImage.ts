import Victor from '../../public/victor.jpeg';

export const loadImage = (participantId: string) => {
    if (!participantId) return;

    switch (participantId) {
        case '1':
            return Victor;
        default:
            return Victor;
    }
};