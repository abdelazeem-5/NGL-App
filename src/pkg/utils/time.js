const toMs = ({time , unit}) => {
    switch(unit){
        case "seconds":
            return time * 1000;
        case "minutes":
            return time * 60 * 1000;
        case "hours":
            return time * 60 * 60 * 1000;
    }
   
}

const toSeconds = ({time , unit}) => {
    switch(unit){
        case "milliseconds":
            return time / 1000;
        case "seconds":
            return time;
        case  "minutes":
            return time * 60;
        case  "hours":
            return time * 60 * 60;
    }
}


export {
    toMs,
    toSeconds
}