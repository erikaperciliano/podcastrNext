export function convertDurationToTimeString(duration: number){
    const hours = Math.floor(duration / 3600); 
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    //se a função retornar somente 1 hr(ou seja: 1 caracter, acrescenta o zero na frente)
    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

        return timeString;
}