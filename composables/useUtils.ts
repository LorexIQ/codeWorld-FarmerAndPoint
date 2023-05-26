export default function () {
    let idCounter = 0;
    const getUniqueId = () => ++idCounter;

    const equallyReactive = <T>(array: T[], newData: T[]) => {
        array.splice(0, array.length);
        newData.forEach(el => array.push(el));
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    return {
        getUniqueId,
        equallyReactive,
        formatDate
    } ;
}
