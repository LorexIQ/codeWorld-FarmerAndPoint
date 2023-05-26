export default function () {
    let idCounter = 0;
    const getUniqueId = () => ++idCounter;

    const equallyReactive = <T>(array: T[], newData: T[]) => {
        array.splice(0, array.length);
        newData.forEach(el => array.push(el));
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const days = date.getDate().toString().padStart(2, '0');
        const months = date.getMonth().toString().padStart(2, '0');
        const years = date.getFullYear().toString().padStart(2, '0');
        return `${days}-${months}-${years}`;
    }

    function parseCardData(cardInfo: string): Card {
        const cardData = cardInfo.split('|');

        return {
            number: cardData[0],
            date: cardData[1],
            cvv: cardData[2]
        };
    }

    return {
        getUniqueId,
        equallyReactive,
        formatDate,
        parseCardData
    } ;
}
